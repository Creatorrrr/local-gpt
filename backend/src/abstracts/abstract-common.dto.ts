import { CommonUtil } from "@/utils/common.util";

/**
 * DTO 공통 추상 클래스
 */
export abstract class AbstractCommonDto {
  toJSON() {
    return CommonUtil.toJSON(this);
  }
}
