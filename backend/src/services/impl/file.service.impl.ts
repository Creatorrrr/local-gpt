import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AbstractCommonService } from "@/services/impl/abstract-common.service";
import { FileService } from "@/services/file.service";
import { Config, ConfigDocument } from "@/schemas/config.schema";
import { FileDto } from "@/dtos/file.dto";

/**
 * 파일 Service 구현
 */
@Injectable()
export class FileServiceImpl extends AbstractCommonService implements FileService {
  constructor(@InjectModel(Config.name) private readonly configModel: Model<ConfigDocument>) {
    super();
    this.logger.debug("FileServiceImpl created");
  }

  async uploadFile(config: FileDto): Promise<{ description: string }> {
    throw new Error("Method not implemented.");
  }
}
