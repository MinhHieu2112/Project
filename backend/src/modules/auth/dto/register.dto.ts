// Data Transfert Object (DTO) for user registration
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'test@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongP@ssw0rd!',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Hieu',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Nguyen',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastname?: string;
}
