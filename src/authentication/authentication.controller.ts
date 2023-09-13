import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from '../common/dto/authentication/register.dto';
import { LoginDto } from '../common/dto/authentication/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('/signup')
  async signUp(@Body() userInfo: RegisterDto): Promise<any> {
    return await this.authService.register(userInfo);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userInfo: LoginDto): Promise<any> {
    return await this.authService.login(userInfo);
  }
}
