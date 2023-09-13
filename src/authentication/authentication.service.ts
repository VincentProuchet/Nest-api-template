import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from 'src/common/dto/authentication/user-register.dto';
import { UserLoginDto } from 'src/common/dto/authentication/user-login.dto';

@Injectable()
export class AuthenticationService {
  async register(userInfo: UserRegisterDto): Promise<any> {
    return userInfo;
  }

  async login(userInfo: UserLoginDto): Promise<any> {
    return userInfo;
  }
}
