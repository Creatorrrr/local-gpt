import { Injectable } from "@nestjs/common";
import { AbstractCommonService } from "@/abstracts/abstract-common.service";
import { FileService } from "@/modules/file/services/file.service";
import { FileDto } from "@/modules/file/dtos/file.dto";

/**
 * 파일 Service 구현
 */
@Injectable()
export class FileServiceImpl extends AbstractCommonService implements FileService {
  constructor() {
    super();
    this.logger.debug("FileServiceImpl created");
  }

  async uploadFile(config: FileDto): Promise<{ description: string }> {
    throw new Error("Method not implemented.");
  }
}
