import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogModule } from './dogs/dogs.module';
import { LoggingInterceptor } from './logging.interceptor';
import { GithubModule } from './github-webhook/github.module';
import { AppMiddleware } from './app.middleware';
// import { SerializeInterceptor } from 'serialize-interceptor';
// you can use @Global() decorator for module.
@Module({
  // put modules(catModule) that exports providers that requried in this module (AppModule)
  imports: [CatsModule, GithubModule, DogModule],
  controllers: [AppController],
  providers: [
    AppService,
    // SerializeInterceptor,
    // alternative global intercepting method, for injection other class
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware);
    //.forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
