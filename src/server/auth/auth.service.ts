import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IJWTPayload } from './types/IJWTPayload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validatePassword(userPass: string, currentPass: string) {
    const isPassValid = await bcrypt.compare(currentPass, userPass);
    return isPassValid;
  }

  async createToken(email: string) {
    const payload: IJWTPayload = {
      email,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
