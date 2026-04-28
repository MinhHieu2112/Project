// Refresh Token Strategy
import { ConfigService } from '@nestjs/config/dist/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  // Validate refresh token
  async validate(req: Request, payload: { sub: string; email: string }) {
    console.log('RefreshTokenStrategy.validate called');
    console.log('Payload', { sub: payload.sub, email: payload.email });

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('No Authorization header found');
      throw new UnauthorizedException('Refresh token not provided');
    }

    const refreshToken = authHeader.replace('Bearer', '').trim();
    if (!refreshToken) {
      throw new UnauthorizedException(
        'Refresh token is empty after extraction',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        role: true,
        refreshToken: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Invalid refresh does not match');
    }

    return { id: user.id, email: user.email, role: user.role };
  }
}
