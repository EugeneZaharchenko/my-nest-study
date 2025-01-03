import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { RequestDetailsMiddleware } from './middleware/request-details/request-details.middleware';
// import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(json());
  // app.use(RequestDetailsMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3003);
}
bootstrap();
// npm run start:dev
