import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { AuthenticationGuard } from './authentication.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordTokenEntity } from './entities/reset-password-token/password.token.entity';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([PasswordTokenEntity])
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AuthenticationModule { }
