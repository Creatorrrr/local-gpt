import { FileDto } from "@/dtos/file.dto";

/**
 * 파일 Service
 */
export interface FileService {
  /**
   * 파일 업로드
   *
   * @param config 등록할 설정 데이터
   */
  uploadFile(config: FileDto): Promise<{ description: string }>;
}
