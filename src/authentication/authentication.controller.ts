import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/in/register.dto';
import { LoginDto } from './dto/in/login.dto';
import { AllowAnonymous } from '../common/decorator/allow-anonymous.decorator';
import { UserGetDto } from 'src/user/dto/out/user-get.dto';
import { AccessTokenDto } from 'src/authentication/dto/out/access-token.dto';

@ApiTags('auth')
@AllowAnonymous()
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('/signUp')
  async signUp(@Body() userInfo: RegisterDto): Promise<UserGetDto> {
    return await this.authService.register(userInfo);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signIn')
  async signIn(@Body() userInfo: LoginDto): Promise<AccessTokenDto> {
    return await this.authService.login(userInfo);
  }
}
