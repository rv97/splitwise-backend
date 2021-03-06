import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/server/services/prisma.service';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { AuthService } from 'src/server/auth/auth.service';
import { LoginUserDto } from '../../shared/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password,
        email: createUserDto.email,
        phone: createUserDto.phone,
      },
    });

    const { accessToken } = await this.authService.createToken(user.email);

    return {
      accessToken,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.findUser(loginUserDto.email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPassValid = await this.authService.validatePassword(
      user.password,
      loginUserDto.password,
    );

    if (!isPassValid) {
      throw new Error('Invalid Password');
    }

    const { accessToken } = await this.authService.createToken(user.email);

    return {
      accessToken,
    };
  }
  async findUser(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getAllUsersEmail(email: string) {
    const userEmails = await this.prisma.user.findMany({
      select: {
        email: true,
      },
    });
    return userEmails.filter((x) => x.email !== email);
  }
}
