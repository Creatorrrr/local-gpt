import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AbstractCommonService } from "@/abstracts/abstract-common.service";
import { File, FileDocument } from "@/schemas/file.schema";
import { FileService } from "@/modules/file/services/file.service";
import { FileDto } from "@/modules/file/dtos/file.dto";

/**
 * 파일 Service 구현
 */
@Injectable()
export class FileServiceImpl extends AbstractCommonService implements FileService {
  constructor(@InjectModel(File.name) private readonly fileModel: Model<FileDocument>) {
    super();
    this.logger.debug("FileServiceImpl created");
  }

  async uploadFile(config: FileDto): Promise<any> {
    const createdFile = await this.fileModel.create(config);

    return createdFile;
  }

  async getFile(fileId: string): Promise<FileDto> {
    const file = await this.fileModel.findById(fileId).exec();

    return new FileDto(file);
  }
}
