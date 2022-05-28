import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IAuthPayload } from '../auth/types/IAuthPayload';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<IAuthPayload> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<IAuthPayload> {
    return this.userService.loginUser(loginUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findUser(req.user.email);
  }
}
