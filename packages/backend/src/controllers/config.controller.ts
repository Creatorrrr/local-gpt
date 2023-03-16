import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { AbstractCommonController } from "@/controllers/abstract-common-controller";
import { ConfigService } from "@/services/config.service";
import { ConfigServiceImpl } from "@/services/impl/config.service.impl";
import { ResultDto } from "@/dtos/result.dto";
import { ConfigDto } from "@/dtos/config.dto";
import { ResultTypes } from "@/errors/result-types";

@Controller()
export class ConfigController extends AbstractCommonController {
  constructor(@Inject(ConfigServiceImpl) private readonly configProvider: ConfigService) {
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
