import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AbstractCommonDto } from "@/abstracts/abstract-common.dto";

/**
 * 대화 DTO
 */
export class ChatDto extends AbstractCommonDto {
  constructor({ role, content }: { role?: string; content?: string } = {}) {
    super();
    this.role = role;
    this.content = content;
  }

  @ApiProperty({ example: "user" })
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  content: string;
}
