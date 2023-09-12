import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrapApp() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(3000);
}
bootstrapApp();
