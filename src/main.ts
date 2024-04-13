import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './guard/jwt.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard())
  const options= new DocumentBuilder()
  .setTitle("Todo App")
  .setDescription("Nest Application")
  .setVersion('1.0')
  .addBearerAuth({
    type:"http",
    scheme:"Bareer",
    bearerFormat:"JWT",
    name:"JWT",
    description:"Enter bareer token",
    in : "header"
  }, "JWT-auth").build()
  let document=SwaggerModule.createDocument(app,options)
  SwaggerModule.setup("api",app,document)
  await app.listen(4000);
}
bootstrap();
