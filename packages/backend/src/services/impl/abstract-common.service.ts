import { Logger } from "@nestjs/common";

/**
 * Provider 공통 추상 클래스
 */
export abstract class AbstractCommonService {
  protected readonly logger = new Logger(this.constructor.name);
}
