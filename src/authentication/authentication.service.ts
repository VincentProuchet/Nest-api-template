import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/common/dto/authentication/register.dto';
import { LoginDto } from 'src/common/dto/authentication/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async register(userInfo: RegisterDto): Promise<any> {
    return this.userService.create(userInfo);
  }

  async login(userInfo: LoginDto): Promise<any> {
    const foundUser: any = await this.userService.getByEmail(userInfo.email);
    if (foundUser != undefined && this.validatePwd(userInfo.password, foundUser.password))
      return foundUser; // return JWT
    else
      throw new BadRequestException("Wrong email or password");
  }

  private validatePwd(input: string, userPwd: string) {
    return input === userPwd;
  }
}
