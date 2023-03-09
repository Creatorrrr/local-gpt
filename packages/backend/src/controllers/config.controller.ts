import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { AbstractCommonController } from "@/controllers/abstract-common-controller";
import { ConfigProvider } from "@/providers/config.provider";
import { ConfigProviderImpl } from "@/providers/impl/config.provider.impl";
import { ResultDto } from "@/dtos/result.dto";
import { ConfigDto } from "@/dtos/config.dto";
import { ResultTypes } from "@/errors/result-types";

@Controller()
export class ConfigController extends AbstractCommonController {
  constructor(@Inject(ConfigProviderImpl) private readonly configProvider: ConfigProvider) {
    super();
    this.logger.debug("ConfigController created");
  }

  @Get("/configs")
  async getConfig(): Promise<ResultDto<ConfigDto>> {
    const result = await this.configProvider.getConfig();
    return this.makeResult(ResultTypes.SUCCESS_GET, result);
  }

  @Post("/configs")
  async postConfig(@Body() config: ConfigDto): Promise<ResultDto<ConfigDto>> {
    const result = await this.configProvider.postConfig(config);
    return this.makeResult(ResultTypes.SUCCESS_REGISTER, result);
  }
}
