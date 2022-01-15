import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './app.bootstrap';
import { middlefunc } from './app.middleware';
import { AppInterceptor } from './app.Interceptor'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
	setupSwagger(app);
	app.use(middlefunc);
  app.useGlobalInterceptors(new AppInterceptor());	
  await app.listen(3000);
}
bootstrap();
