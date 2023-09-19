import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

import "reflect-metadata";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    })
  );

  const swaggerDocumentation = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api-docs", app, swaggerDocumentation);

  app.enableCors();

  await app.listen(3333);
}

bootstrap();
