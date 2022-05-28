import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
export class LoginUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
