import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AbstractCommonController } from "@/controllers/abstract-common-controller";
import { ConfigService } from "@/services/config.service";
import { ConfigServiceImpl } from "@/services/impl/config.service.impl";
import { ResultDto } from "@/dtos/result.dto";
import { ConfigDto } from "@/dtos/config.dto";
import { ResultTypes } from "@/errors/result-types";

@Controller()
@ApiTags("설정 API")
export class ConfigController extends AbstractCommonController {
  constructor(@Inject(ConfigServiceImpl) private readonly configService: ConfigService) {
    super();
    this.logger.debug("ConfigController created");
  }

  @Get("/configs")
  @ApiOperation({ summary: "설정 조회" })
  async getConfig(): Promise<ResultDto<ConfigDto>> {
    const result = await this.configService.getConfig();
    return this.makeResult(ResultTypes.SUCCESS_GET, result);
  }

  @Post("/configs")
  @ApiOperation({ summary: "설정 등록" })
  async postConfig(@Body() config: ConfigDto): Promise<ResultDto<ConfigDto>> {
    const result = await this.configService.postConfig(config);
    return this.makeResult(ResultTypes.SUCCESS_REGISTER, result);
  }
}
