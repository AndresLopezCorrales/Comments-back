import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para el frontend
  app.enableCors({
    origin: 'https://wallappfront.netlify.app', //*
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(`Corriendo APP en el puerto ${process.env.PORT ?? 3001}`);
}
bootstrap();