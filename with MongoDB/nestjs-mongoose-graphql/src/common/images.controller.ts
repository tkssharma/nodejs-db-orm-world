import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { FileUploadService } from "./services/file-upload.service";
import { Public } from "../auth/decorators";

@Controller("images")
export class ImagesController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Get(":name")
  @Public()
  getImage(@Param("name") name: string, @Res() res: Response) {
    res.sendFile(this.fileUploadService.getFilePath(name));
  }
}
