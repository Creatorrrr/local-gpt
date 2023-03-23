import { AbstractCommonDto } from "@/abstracts/abstract-common.dto";

/**
 * DTO 타임스탬프 추상 클래스
 */
export abstract class AbstractTimestampDto extends AbstractCommonDto {
  createdAt: Date;
  updatedAt: Date;
}
