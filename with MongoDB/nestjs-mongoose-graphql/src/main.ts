import "source-map-support/register";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { MongoErrorFilter } from "./common/mongo-error.filter";
import { JwtAuthGuard } from "./auth/auth.guard";
import * as mongoose from "mongoose";
import { graphqlUploadExpress } from "graphql-upload";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, "..", "static"));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoErrorFilter());
  app.use(
    graphqlUploadExpress({
      maxFieldSize: 500 * 1000,
      maxFiles: 5,
      maxFileSize: 500 * 1000,
    }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  mongoose.set("debug", true);
  const server = await app.listen(configService.get<number>("SERVER_PORT"));
  server.setTimeout(60 * 1000);
  server.keepAliveTimeout = 60 * 1000;
}
bootstrap();
