import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AbstractCommonProvider } from "@/providers/impl/abstract-common.provider";
import { ConfigProvider } from "@/providers/config.provider";
import { ConfigDto } from "@/dtos/config.dto";
import { Config, ConfigDocument } from "@/schemas/config.schema";

/**
 * 설정 Provider 구현
 */
@Injectable()
export class ConfigProviderImpl extends AbstractCommonProvider implements ConfigProvider {
  constructor(@InjectModel(Config.name) private readonly configModel: Model<ConfigDocument>) {
    super();
    this.logger.debug("ConfigProvider created");
  }

  async getConfig(): Promise<ConfigDto> {
    const configList = await this.configModel.find().exec();
    const configDto = new ConfigDto(configList?.[0]?.toObject());

    return configDto;
  }

  async postConfig(config: ConfigDto): Promise<ConfigDto> {
    const createdConfig = await this.configModel.create(config);

    return new ConfigDto(createdConfig.toObject());
  }
}
