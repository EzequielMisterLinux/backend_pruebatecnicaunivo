import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configurar CORS con opciones más amplias
  app.enableCors({
    origin: '*', // Ajusta esto según tus necesidades de seguridad
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API for managing tasks')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Configuración directa de la URL de Railway
  const port = process.env.PORT || 3000;
  const host = '0.0.0.0'; // Escucha en todas las interfaces de red

  await app.listen(port, host, () => {
    console.log(`Application is running on: http://0.0.0.0:${port}`);
    console.log(`Swagger docs available at: http://0.0.0.0:${port}/api-docs`);
  });
}

bootstrap();
