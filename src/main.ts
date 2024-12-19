import { AppModule } from './app.module';
import { Logger } from './logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = await app.resolve(Logger);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
