import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { AccessToken } from './auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(username);
    if (user && compareSync(pass, user.password)) {
      delete user.password;
      return {
        userId: user.id,
        username: user.email,
        ...user,
      };
    }
    return new UnauthorizedException('There was an error, try again later.');
  }

  async login(user: any): Promise<AccessToken> {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: 86400 * 15 }),
    };
  }
}
