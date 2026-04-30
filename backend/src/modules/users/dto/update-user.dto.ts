import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

// DTO for updating user profile
export class UpdateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'Hieu',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Hieu',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Nguyen',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}
