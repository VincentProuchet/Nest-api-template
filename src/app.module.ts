import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserEntity } from './user/repositories/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'environments/.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT != null ? +process.env.DB_PORT : 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8mb4',
        synchronize: process.env.NODE_ENV === 'development' ? true : false,
        debug: false,
        entities: [
          UserEntity,
        ],
        migrations: ['../typeorm_migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migration'
        },
        migrationsTableName: "migrations_history",
      }),
    }),
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
