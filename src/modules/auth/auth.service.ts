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
    const user = await this.userService.getUserByEmail(
      username,
      undefined,
      true
    );

    if (user && compareSync(pass, user.password)) {
      return {
        userId: user.id,
        username: user.email,
        password: undefined,
        ...user,
      };
    }

    throw new UnauthorizedException(
      'Se producido un problema, por favor intentar mas tarde'
    );
  }

  async login(user: any): Promise<AccessToken> {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: 86400 * 15 }),
      tokenType: 'Bearer',
    };
  }
}
