import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AbstractCommonService } from "@/services/impl/abstract-common.service";
import { ChatService } from "@/services/chat.service";
import { ChatDto } from "@/dtos/chat.dto";
import { ChatLogDto } from "@/dtos/chat-log.dto";
import { Config, ConfigDocument } from "@/schemas/config.schema";
import { Chat, ChatDocument } from "@/schemas/chat.schema";
import { ChatLog, ChatLogDocument } from "@/schemas/chat-log.schema";
import { MODEL_ENGINE, TEMPERATURE } from "@/constants/openai.constant";

/**
 * 대화 Provider 구현
 */
@Injectable()
export class ChatServiceImpl extends AbstractCommonService implements ChatService {
  constructor(
    @InjectModel(Config.name) private readonly configModel: Model<ConfigDocument>,
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
    @InjectModel(ChatLog.name) private readonly chatLogModel: Model<ChatLogDocument>
  ) {
    super();
    this.logger.debug("ChatProvider created");
  }

  async getChats(): Promise<ChatDto[]> {
    const chatList = await this.chatModel.find().exec();
    const ChatDtoList = chatList.map((item) => new ChatDto(item.toObject()));

    return ChatDtoList;
  }

  async sendChat(chat: ChatDto): Promise<string> {
    await this.chatModel.create(chat);

    const config = await this.configModel.findOne().exec();
    const { modelEngine = MODEL_ENGINE, apiKey, temperature = TEMPERATURE } = config || {};

    if (!apiKey) throw new Error("API키를 등록해주세요.");

    const openAiApi = new OpenAIApi(new Configuration({ apiKey }));
    const chatList = await this.chatModel.find().exec();
    const messages = chatList.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];

    const completion = await openAiApi.createChatCompletion({ model: modelEngine, temperature, messages });
    await this.chatLogModel.create(completion.data);

    const message = completion.data.choices[0].message;
    await this.chatModel.create(message);

    return message.content.trim();
  }

  async deleteChats() {
    await this.chatModel.deleteMany().exec();
  }

  async getChatLogs(): Promise<ChatLogDto[]> {
    const chatLogList = await this.chatLogModel.find().exec();
    return chatLogList.map((item) => new ChatLogDto(item.toObject()));
  }
}
