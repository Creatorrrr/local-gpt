import { IsNumber, IsString } from "class-validator";
import { AbstractCommonDto } from "@/abstracts/abstract-common.dto";
import { ApiProperty } from "@nestjs/swagger";
import { MODEL_ENGINE, TEMPERATURE } from "@/constants/openai.constant";

/**
 * 설정 DTO
 */
export class ConfigDto extends AbstractCommonDto {
  constructor({
    modelEngine,
    apiKey,
    temperature,
  }: { modelEngine?: string; apiKey?: string; temperature?: number } = {}) {
    super();
    this.modelEngine = modelEngine;
    this.apiKey = apiKey;
    this.temperature = temperature;
  }

  @ApiProperty({ example: MODEL_ENGINE })
  @IsString()
  modelEngine: string;

  @ApiProperty()
  @IsString()
  apiKey: string;

  @ApiProperty({ example: TEMPERATURE })
  @IsNumber()
  temperature: number;
}
