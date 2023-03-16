import { Body, Controller, Delete, Get, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AbstractCommonController } from "@/controllers/abstract-common-controller";
import { ChatService } from "@/services/chat.service";
import { ChatServiceImpl } from "@/services/impl/chat.service.impl";
import { ResultDto } from "@/dtos/result.dto";
import { ChatDto } from "@/dtos/chat.dto";
import { ChatLogDto } from "@/dtos/chat-log.dto";
import { ResultTypes } from "@/errors/result-types";

@Controller()
@ApiTags("채팅 API")
export class ChatController extends AbstractCommonController {
  constructor(@Inject(ChatServiceImpl) private readonly chatService: ChatService) {
    super();
    this.logger.debug("ChatController created");
  }

  @Get("/chats")
  @ApiOperation({ summary: "채팅 리스트 조회" })
  async getChats(): Promise<ResultDto<ChatDto[]>> {
    const result = await this.chatService.getChats();
    return this.makeResult(ResultTypes.SUCCESS_GET, result);
  }

  @Post("/chats")
  @ApiOperation({ summary: "채팅 등록" })
  async postChat(@Body() chat: ChatDto): Promise<ResultDto<string>> {
    const result = await this.chatService.sendChat(chat);
    return this.makeResult(ResultTypes.SUCCESS_SEND, result);
  }

  @Delete("/chats")
  @ApiOperation({ summary: "채팅 삭제" })
  async deleteChats(): Promise<ResultDto<void>> {
    await this.chatService.deleteChats();
    return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY);
  }

  @Get("/chat-logs")
  @ApiOperation({ summary: "채팅 로그 리스트 조회" })
  async getChatLogs(): Promise<ResultDto<ChatLogDto[]>> {
    const result = await this.chatService.getChatLogs();
    return this.makeResult(ResultTypes.SUCCESS, result);
  }
}
