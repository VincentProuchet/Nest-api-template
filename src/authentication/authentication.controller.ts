import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Req, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/in/register.dto';
import { LoginDto } from './dto/in/login.dto';
import { AllowAnonymous } from '../common/decorator/allow-anonymous.decorator';
import { UserGetDto } from '../user/dto/out/user-get.dto';
import { AccessTokenDto } from '../authentication/dto/out/access-token.dto';
import { StringEmailDto } from '../common/dto/string-email.dto';
import { ResetPwdDto } from './dto/in/reset-password.dto';

@ApiTags('auth')
@AllowAnonymous()
@Controller('auth')
export class AuthenticationController {

  private new_password_controler = "new-password";

  constructor(private readonly authService: AuthenticationService) { }

  @Post('/signUp')
  async signUp(@Body() userInfo: RegisterDto): Promise<UserGetDto> {
    return await this.authService.register(userInfo);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signIn')
  async signIn(@Body() userInfo: LoginDto): Promise<AccessTokenDto> {
    return await this.authService.login(userInfo);
  }
  /**
   * controleur pour démarrer la procedure de ré-initialisation de mot de passe
   * l'utilisateur ne doit fournir que un email 
   * @param stringEmailDto 
   * @param referrer récupéré automatiquement 
   * addresse du frontend
   */
  @HttpCode(HttpStatus.OK)
  @Post('/forgotPwd')
  async forgotPwd(@Body() stringEmailDto: StringEmailDto, @Headers('host') referrer: string = ""): Promise<void> {
    console.log(referrer);
    await this.authService.sendForgotPwdEmail(stringEmailDto.email, referrer, this.new_password_controler);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/resetPwd')
  async resetPwd(@Body() stringPwdDto: ResetPwdDto, @Req() request: Request): Promise<void> {
    //request.headers.host;
    await this.authService.resetPassword(stringPwdDto);
  }
}
