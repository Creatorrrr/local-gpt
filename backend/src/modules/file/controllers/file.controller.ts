import { Controller, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AbstractCommonController } from "@/abstracts/abstract-common-controller";
import { ResultDto } from "@/dtos/result.dto";
import { ResultTypes } from "@/result-types/result-types";
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
  @UseInterceptors(FileInterceptor("file"))
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
  async postFile(@UploadedFile() file: Express.Multer.File): Promise<ResultDto<{ description: string }>> {
    const fileDto = new FileDto(file);
    const result = await this.fileService.uploadFile(fileDto);
    return this.makeResult(ResultTypes.SUCCESS_UPLOAD, result);
  }
}
