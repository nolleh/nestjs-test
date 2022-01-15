import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggingInterceptor } from './logging.interceptor';
import { GithubModule } from './github-webhook/github.module';

// you can use @Global() decorator for module.
@Module({
	// put modules(catModule) that exports providers that requried in this module (AppModule)
  imports: [CatsModule, GithubModule],
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
