import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
export class LoginUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(7, {
    message: 'Password should be minimum of 7 characters',
  })
  @ApiProperty()
  password: string;
}
