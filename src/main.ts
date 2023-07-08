import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotfoundFilter } from './notfound.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new NotfoundFilter());

  await app.listen(6969);
}
bootstrap();
