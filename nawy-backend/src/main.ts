import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = configuration();
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  app.enableVersioning({ type: VersioningType.URI });

  // Set global prefix
  app.setGlobalPrefix(appConfig.app_prefix);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Nawy API')
    .setDescription('The Nawy apartment management API documentation')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${appConfig.app_prefix}/v1/docs`, app, document);


  await app.listen(appConfig.port);
  console.log(`Application is running on: http://localhost:${appConfig.port}/api/v1`);
  console.log(`Swagger documentation available at: http://localhost:${appConfig.port}/api/v1/docs`);
}

bootstrap();
