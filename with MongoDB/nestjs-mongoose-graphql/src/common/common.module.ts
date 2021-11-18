import { Module } from "@nestjs/common";
import { PUB_SUB } from "./constants";
import { PubSub } from "graphql-subscriptions";
import { FileUploadService } from "./services/file-upload.service";
import { ImagesController } from "./images.controller";

const pubSubProvider = {
  provide: PUB_SUB,
  useValue: new PubSub(),
};

@Module({
  providers: [pubSubProvider, FileUploadService],
  controllers: [ImagesController],
  exports: [pubSubProvider, FileUploadService],
})
export class CommonModule {}
