import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/common/dto/authentication/register.dto';
import { LoginDto } from 'src/common/dto/authentication/login.dto';

@Injectable()
export class AuthenticationService {
  async register(userInfo: RegisterDto): Promise<any> {
    return userInfo;
  }

  async login(userInfo: LoginDto): Promise<any> {
    return userInfo;
  }
}
