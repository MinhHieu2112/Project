// DTO for auth response

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/client.js';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Access token for authenticated requests',
    example: 'my_jwt_access_token',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Refresh token for obtaining new access tokens',
    example: 'my_jwt_refresh_token',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Authenticated user information',
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      firstName: 'Hieu',
      lastName: 'Nguyen',
      role: 'USER',
    },
  })
  user!: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: Role;
  };
}
