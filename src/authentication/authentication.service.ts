import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userInfo: RegisterDto): Promise<any> {
    return this.userService.create(userInfo);
  }

  async login(userInfo: LoginDto): Promise<any> {
    const foundUser: any = await this.userService.getByEmail(userInfo.email);
    if (foundUser?.password !== userInfo.password)
      throw new UnauthorizedException('Wrong email or password');

    const payload = { sub: foundUser.id, username: foundUser.email };
    const response = {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE,
      }),
    };

    return response;
  }
}
