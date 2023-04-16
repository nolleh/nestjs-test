import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './app.bootstrap';
import { middlefunc } from './app.middleware';
import { SerializeInterceptor } from 'serialize-interceptor';
// import { AppDataSource } from 'data-source';
// import { CsvParser } from '@nolleh/simple-csv-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.use(middlefunc);
  // camelToSnake(null);
  app.useGlobalInterceptors(new SerializeInterceptor());
  //

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // await AppDataSource.initialize();
  //  .then(() => {
  //    // here you can start to work with your database
  //  })
  //  .catch((error) => console.log(error));
  //
  // class Message {
  //   name!: string;
  //   message!: string;
  //   constructor(payload?: Partial<Message>) {
  //     Object.assign(this, payload);
  //   }
  // }
  //
  // const messages = CsvParser.toObject<Message>(
  //   `name,message\r\nnolleh,"hello, world"\nnolleh,hello2`,
  // );
  // console.log({ messages });
  await app.listen(3000);
}

bootstrap();
