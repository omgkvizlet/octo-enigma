import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotfoundFilter } from './notfound.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new NotfoundFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(6969);
}
bootstrap();
