import { Body, Controller, Delete, Get, Inject, Post } from "@nestjs/common";
import { AbstractCommonController } from "@/controllers/abstract-common-controller";
import { ChatProvider } from "@/providers/chat.provider";
import { ChatProviderImpl } from "@/providers/impl/chat.provider.impl";
import { ResultDto } from "@/dtos/result.dto";
import { ChatDto } from "@/dtos/chat.dto";
import { ChatLogDto } from "@/dtos/chat-log.dto";
import { ResultTypes } from "@/errors/result-types";

@Controller()
export class ChatController extends AbstractCommonController {
  constructor(@Inject(ChatProviderImpl) private readonly chatProvider: ChatProvider) {
    super();
    this.logger.debug("ChatController created");
  }

  @Get("/chats")
  async getChats(): Promise<ResultDto<ChatDto[]>> {
    const result = await this.chatProvider.getChats();
    return this.makeResult(ResultTypes.SUCCESS_GET, result);
  }

  @Post("/chats")
  async sendChat(@Body() chat: ChatDto): Promise<ResultDto<string>> {
    const result = await this.chatProvider.sendChat(chat);
    return this.makeResult(ResultTypes.SUCCESS_SEND, result);
  }

  @Delete("/chats")
  async deleteChats(): Promise<ResultDto<void>> {
    await this.chatProvider.deleteChats();
    return this.makeResult(ResultTypes.SUCCESS_GET_EMPTY);
  }

  @Get("/chat-logs")
  async getChatLogs(): Promise<ResultDto<ChatLogDto[]>> {
    const result = await this.chatProvider.getChatLogs();
    return this.makeResult(ResultTypes.SUCCESS, result);
  }
}
