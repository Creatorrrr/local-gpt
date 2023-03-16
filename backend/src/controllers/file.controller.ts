import { Controller, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AbstractCommonController } from "@/controllers/abstract-common-controller";
import { FileService } from "@/services/file.service";
import { FileServiceImpl } from "@/services/impl/file.service.impl";
import { ResultDto } from "@/dtos/result.dto";
import { FileDto } from "@/dtos/file.dto";
import { ResultTypes } from "@/errors/result-types";

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
  async postFile(@UploadedFile() file: Express.Multer.File): Promise<ResultDto<{ description: string }>> {
    const fileDto = new FileDto(file);
    const result = await this.fileService.uploadFile(fileDto);
    return this.makeResult(ResultTypes.SUCCESS_REGISTER, result);
  }
}
