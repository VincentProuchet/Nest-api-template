import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AllowAnonymous } from '../common/decorator/allow-anonymous.decorator';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @AllowAnonymous()
  @Post('/signup')
  async signUp(@Body() userInfo: RegisterDto): Promise<any> {
    return await this.authService.register(userInfo);
  }

  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() userInfo: LoginDto): Promise<any> {
    return await this.authService.login(userInfo);
  }
}
