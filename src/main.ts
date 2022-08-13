import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './app.bootstrap';
import { middlefunc } from './app.middleware';
// import { SerializeInterceptor, camelToSnake } from 'serialize-interceptor';
import { AppDataSource } from 'data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.use(middlefunc);
  // camelToSnake(null);
  // app.useGlobalInterceptors(new SerializeInterceptor());
  //

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await AppDataSource.initialize();
  //  .then(() => {
  //    // here you can start to work with your database
  //  })
  //  .catch((error) => console.log(error));
  await app.listen(3000);
}

bootstrap();
