import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs-extra";
import * as mime from "mime-types";
import { randomUUID } from "crypto";
import { Response } from "express";
import { Controller, Get, Inject, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AbstractCommonController } from "@/abstracts/abstract-common-controller";
import { ResultDto } from "@/dtos/result.dto";
import { ResultTypes } from "@/result-types/result-types";
import { FILE_PATH } from "@/constants/file.constant";
import { FileService } from "@/modules/file/services/file.service";
import { FileServiceImpl } from "@/modules/file/services/impls/file.service.impl";
import { FileDto } from "@/modules/file/dtos/file.dto";

@Controller()
@ApiTags("파일 API")
export class FileController extends AbstractCommonController {
  constructor(@Inject(FileServiceImpl) private readonly fileService: FileService) {
    super();
    this.logger.debug("FileController created");
  }

  @Post("/files")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: FILE_PATH,
        filename: (_, file, callback) => {
          const originalName = path.parse(file.originalname);
          const extension = originalName.ext;
          const newFilename = randomUUID() + extension;

          const encodedFilename = Buffer.from(newFilename, "latin1").toString("utf-8");

          callback(null, encodedFilename);
        },
      }),
    })
  )
  @ApiOperation({ summary: "파일 업로드" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async postFile(@UploadedFile() file: Express.Multer.File): Promise<ResultDto<any>> {
    const fileDto = new FileDto(file);
    const result = await this.fileService.uploadFile(fileDto);

    return this.makeResult(ResultTypes.SUCCESS_UPLOAD, result);
  }

  @Get("/files/:fileId")
  @ApiOperation({ summary: "파일 다운로드" })
  async downloadFile(@Param("fileId") fileId: string, @Res() res: Response): Promise<void> {
    const file = await this.fileService.getFile(fileId);

    const fileStream = fs.createReadStream(file.path);

    const utf8FileName = Buffer.from(file.originalname, "latin1").toString("utf-8");
    const encodedFileName = encodeURIComponent(utf8FileName);
    res.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${encodedFileName}`);
    res.setHeader("Content-Type", `${mime.contentType(encodedFileName)}`);

    fileStream.pipe(res);
  }
}
