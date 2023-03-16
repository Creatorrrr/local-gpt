import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "@/schemas/chat.schema";
import { ChatLog, ChatLogSchema } from "@/schemas/chat-log.schema";
import { Config, ConfigSchema } from "@/schemas/config.schema";
import { ChatController } from "@/modules/chat/controllers/chat.controller";
import { ChatServiceImpl } from "@/modules/chat/services/impls/chat.service.impl";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: ChatLog.name, schema: ChatLogSchema },
      { name: Config.name, schema: ConfigSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatServiceImpl],
})
export class ChatModule {}
