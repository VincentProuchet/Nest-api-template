import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { dataSourceOpt } from './common/constant/datasource-opt.const';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './mail/mail.module';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.STATIC_DIRNAME!),
    }),
    MulterModule.register({
      dest: join(__dirname, '..', process.env.STATIC_DIRNAME!),
      limits: {
        fileSize: process.env.UPLOAD_MAX_FILE_SIZE ? +process.env.UPLOAD_MAX_FILE_SIZE : 5242880,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOpt as TypeOrmModuleAsyncOptions,
    }),
    MailerModule.forRootAsync({
      useFactory: () => (AppModule.getMailerModule()),
    }),
    UserModule,
    AuthenticationModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
  /**
   * j'ai préféré déplacer la configuration de mailer
    plus bas pour ne pas encombrer la liste des modules avec du code
   * @returns un objet de configuration pour MailerModule
   */
  static getMailerModule(): MailerOptions {
    return {
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        ignoreTLS: process.env.MAIL_IGNORETLS ? true : false,
        secure: process.env.MAIL_SECURE ? true : false,
        auth: {
          user: process.env.MAIL_SENDER,
          pass: process.env.MAIL_SENDER_PASSWORD,
        },
      },
      defaults: {
        from: `"nest-modules" <${process.env.MAIL_ACCOUNT_SENDER!}>`,
      },
      preview: process.env.MAIL_PREVIEW ? true : false,
      template: {
        dir: join(__dirname, `/${process.env.MAIL_TEMPLATE_DIRECTORY}`),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }

}
