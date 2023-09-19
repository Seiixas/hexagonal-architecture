import { DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";

type SwaggerConfig = Omit<OpenAPIObject, "paths">;

export const swaggerConfig: SwaggerConfig = new DocumentBuilder()
  .setTitle("PDI API")
  .setVersion("0.0.1")
  .addTag("places")
  .addTag("users")
  .addTag("auth")
  .addTag("companies")
  .setBasePath("http://localhost:3333")
  .build();
