import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AbstractCommonService } from "@/services/impl/abstract-common.service";
import { ConfigService } from "@/services/config.service";
import { ConfigDto } from "@/dtos/config.dto";
import { Config, ConfigDocument } from "@/schemas/config.schema";

/**
 * 설정 Provider 구현
 */
@Injectable()
export class ConfigServiceImpl extends AbstractCommonService implements ConfigService {
  constructor(@InjectModel(Config.name) private readonly configModel: Model<ConfigDocument>) {
    super();
    this.logger.debug("ConfigProvider created");
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
