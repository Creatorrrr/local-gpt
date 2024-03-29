import { ConfigDto } from "@/modules/config/dtos/config.dto";

/**
 * 설정 Service
 */
export interface ConfigService {
  /**
   * 설정 조회
   */
  getConfig(): Promise<ConfigDto>;

  /**
   * 설정 등록
   *
   * @param config 등록할 설정 데이터
   */
  postConfig(config: ConfigDto): Promise<ConfigDto>;
}
