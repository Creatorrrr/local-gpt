import { AbstractCommonDto } from "@/dtos/abstract-common.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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
