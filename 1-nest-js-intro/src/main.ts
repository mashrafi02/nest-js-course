import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // this will remove any properties that are not defined in the DTO
    forbidNonWhitelisted: true, // this will throw an error if there are any properties that are not defined in the DTO,
    transform: true, // this will automatically transform the payload to the DTO class instance
  }));
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();