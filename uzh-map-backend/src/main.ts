import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from '../seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Community API')
    .setDescription('API for managmenting community')
    .setVersion('1.0')
    .build();

  // Запуск seeds для заповнення БД (non-blocking)
  const seed = app.get(SeedService);
  seed.run().catch((err) => {
    console.error('Seed service error:', err);
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  console.log('Swagger available at /api-docs');

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';
  
  await app.listen(port, host);
  console.log(`Application is running on: http://${host}:${port}`);
}
bootstrap();
