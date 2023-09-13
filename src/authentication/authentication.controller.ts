import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserRegisterDto } from '../common/dto/authentication/user-register.dto';
import { UserLoginDto } from '../common/dto/authentication/user-login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('/signup')
  async signUp(@Body() userInfo: UserRegisterDto): Promise<any> {
    return await this.authService.register(userInfo);
  }

  @Post('/signin')
  async signIn(@Body() userInfo: UserLoginDto): Promise<any> {
    return await this.authService.login(userInfo);
  }
}
