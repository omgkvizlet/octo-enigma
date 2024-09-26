import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotfoundFilter } from './filters/notfound.filter';
import { ValidationPipe } from '@nestjs/common';
import { ServerErrorFilter } from './filters/server-error.filter';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const isDev = configService.get('DEV_MODE') === 'true';

  // Filter order: notFound -> http exceptions -> all errors
  app.useGlobalFilters(new ServerErrorFilter(isDev));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new NotfoundFilter(isDev));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(6969);
}
bootstrap();
