import { FileDto } from "@/modules/file/dtos/file.dto";

/**
 * 파일 Service
 */
export interface FileService {
  /**
   * 파일 업로드
   *
   * @param file 업로드된 파일 데이터
   */
  uploadFile(file: FileDto): Promise<any>;

  getFile(fileId: string): Promise<FileDto>;
}
