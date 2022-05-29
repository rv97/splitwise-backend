import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'signup', method: RequestMethod.GET },
      { path: 'login', method: RequestMethod.GET },
      { path: 'expense', method: RequestMethod.GET },
      { path: '/', method: RequestMethod.GET },
    ],
  });
  const config = new DocumentBuilder()
    .setTitle('Splitwise Backend')
    .setDescription('The API Service for splitwise')
    .setVersion('1.0')
    .addTag('splitwise')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
