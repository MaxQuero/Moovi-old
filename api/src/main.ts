import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import * as dotenv from 'dotenv'
import { ClassSerializerInterceptor } from '@nestjs/common';
import {MyClassSerializerInterceptor} from "./interceptors/custom-serializer.interceptor";
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new MyClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(5000);
}
bootstrap();