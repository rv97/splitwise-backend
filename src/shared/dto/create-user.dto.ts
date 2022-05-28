import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MaxLength(20, {
    message: 'Name is too long',
  })
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  phone?: string;
}
