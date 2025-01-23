import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONT_URL').split(', '),
    methods: configService.get<string>('HTTP_METHODS').split(', '),
    allowedHeaders: configService.get<string>('ALLOWED_HEADERS').split(', '),
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
