import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './app.bootstrap';
import { middlefunc } from './app.middleware';
import { SerializeInterceptor } from 'serialize.interceptor'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  setupSwagger(app);
  app.use(middlefunc);
  app.useGlobalInterceptors(new SerializeInterceptor());	

  await app.listen(3000);
}

bootstrap();
