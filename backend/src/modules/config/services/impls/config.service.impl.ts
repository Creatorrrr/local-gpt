import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AbstractCommonService } from "@/abstracts/abstract-common.service";
import { Config, ConfigDocument } from "@/schemas/config.schema";
import { ConfigService } from "@/modules/config/services/config.service";
import { ConfigDto } from "@/modules/config/dtos/config.dto";

/**
 * 설정 Service 구현
 */
@Injectable()
export class ConfigServiceImpl extends AbstractCommonService implements ConfigService {
  constructor(@InjectModel(Config.name) private readonly configModel: Model<ConfigDocument>) {
    super();
    this.logger.debug("ConfigServiceImpl created");
  }

  async getConfig(): Promise<ConfigDto> {
    const configList = await this.configModel.find().exec();

    return new ConfigDto(configList?.[0]?.toObject());
  }

  async postConfig(config: ConfigDto): Promise<ConfigDto> {
    await this.configModel.deleteMany().exec();

    const createdConfig = await this.configModel.create(config);

    return new ConfigDto(createdConfig.toObject());
  }
}
