import { ChatLogDto } from "@/modules/chat/dtos/chat-log.dto";
import { ChatDto } from "@/modules/chat/dtos/chat.dto";

/**
 * 대화 Service
 */
export interface ChatService {
  /**
   * 모든 대화 조회
   */
  getChats(): Promise<ChatDto[]>;

  /**
   * 대화 발송
   *
   * @param chat 발송할 대화의 데이터
   */
  sendChat(chat: ChatDto): Promise<string>;

  /**
   * 모든 대화 삭제
   */
  deleteChats();

  /**
   * 모든 대화 로그 조회
   */
  getChatLogs(): Promise<ChatLogDto[]>;
}
