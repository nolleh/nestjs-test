import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggingInterceptor } from './logging.interceptor';

// you can use @Global() decorator for module.
@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
		AppService,
		// alternative global intercepting method, for injection other class
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
	],
})
export class AppModule {}