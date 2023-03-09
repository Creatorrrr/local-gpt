import { IsObject, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * 대화 DTO
 */
export class ChatLogDto {
  constructor({
    id,
    object,
    created,
    model,
    usage,
    choices,
  }: {
    id: string;
    object: string;
    created: string;
    model: string;
    usage: { promptTokens: number; completionTokens: number; totalTokens: number };
    choices: { message: { role: string; content: string }; finishReason: string; index: number }[];
  }) {
    this.id = id;
    this.object = object;
    this.created = created;
    this.model = model;
    this.usage = usage;
    this.choices = choices;
  }

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  object: string;

  @ApiProperty()
  @IsString()
  created: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsObject()
  usage: { promptTokens: number; completionTokens: number; totalTokens: number };

  @ApiProperty()
  @IsObject()
  choices: { message: { role: string; content: string }; finishReason: string; index: number }[];
}
