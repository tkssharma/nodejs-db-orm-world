import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createdocument } from './swagger/swagger';
import { LoggingInterceptor } from './shared/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('api', app, createdocument(app));
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
