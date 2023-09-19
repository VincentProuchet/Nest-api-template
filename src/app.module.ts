import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { dataSourceOpt } from './common/constant/datasource-opt.const';

@Module({
    imports: [
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
