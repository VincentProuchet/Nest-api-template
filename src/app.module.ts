import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { dataSourceOpt } from './common/constant/datasource-opt.const';

@Module({
  imports: [
    ...(process.env.STATIC_DIRNAME ? [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', process.env.STATIC_DIRNAME),
      })]
      : []
    ),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOpt as TypeOrmModuleAsyncOptions,
    }),
    UserModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
