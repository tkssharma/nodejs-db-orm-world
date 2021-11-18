import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileUpload } from "graphql-upload";
import { extname, basename, join, resolve } from "path";
import { v4 } from "uuid";
import { mkdirSync, existsSync, createWriteStream, rmSync } from "fs";

@Injectable()
export class FileUploadService {
  private readonly uploadPath: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadPath = configService.get<string>("UPLOAD_PATH");
  }

  private createUploadDirectoryIfNeeded() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async saveFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = await file;
    const ext = extname(filename);
    const name = basename(filename, ext);
    const newFileName = `${name}_${v4()}${ext}`;
    const filePath = join(this.uploadPath, newFileName);
    this.createUploadDirectoryIfNeeded();
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on("finish", () => resolve(newFileName))
        .on("error", () => reject()),
    );
  }

  getFilePath(fileName: string): string {
    return resolve(join(this.uploadPath, fileName));
  }

  deleteFile(fileName: string) {
    rmSync(this.getFilePath(fileName));
  }
}
