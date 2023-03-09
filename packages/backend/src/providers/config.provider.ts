import { ConfigDto } from "@/dtos/config.dto";

/**
 * 설정 Provider
 */
export interface ConfigProvider {
  /**
   * 설정 조회
   */
  getConfig(): Promise<ConfigDto>;

  /**
   * 설정 등록
   *
   * @param chat 등록할 설정 데이터
   */
  postConfig(config: ConfigDto): Promise<ConfigDto>;
}
