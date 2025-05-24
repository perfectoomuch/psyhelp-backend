import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RequestTraceId from './core/middlewares/RequestTraceId';
import ContentTypeJson from './core/middlewares/ContentTypeJson';
import { ValidationPipe } from '@nestjs/common';
import ngrok from 'ngrok';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(RequestTraceId);
  app.use(ContentTypeJson);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  // await ngrok.authtoken(process.env.NGROK_TOKEN);
  // const url = await ngrok.connect(parseInt(process.env.PORT) ?? 3000);
  // console.log(url);
}
bootstrap();
