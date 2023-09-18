import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AllowAnonymous } from '../common/decorator/allow-anonymous.decorator';
import { UserGetDto } from 'src/user/dto/user-get.dto';
import { AccessTokenDto } from 'src/authentication/dto/access-token.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@AllowAnonymous()
@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post('/signup')
    async signUp(@Body() userInfo: RegisterDto): Promise<UserGetDto> {
        return await this.authService.register(userInfo);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    async signIn(@Body() userInfo: LoginDto): Promise<AccessTokenDto> {
        return await this.authService.login(userInfo);
    }
}
