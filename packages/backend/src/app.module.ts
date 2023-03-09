import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatController } from "@/controllers/chat.controller";
import { ConfigController } from "@/controllers/config.controller";
import { ChatProviderImpl } from "@/providers/impl/chat.provider.impl";
import { ConfigProviderImpl } from "./providers/impl/config.provider.impl";
import { Config, ConfigSchema } from "./schemas/config.schema";
import { Chat, ChatSchema } from "@/schemas/chat.schema";
import { ChatLog, ChatLogSchema } from "@/schemas/chat-log.schema";
import { DATABASE } from "@/constants/database.constant";

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE),
    MongooseModule.forFeature([
      { name: Config.name, schema: ConfigSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: ChatLog.name, schema: ChatLogSchema },
    ]),
  ],
  providers: [ConfigProviderImpl, ChatProviderImpl],
  controllers: [ConfigController, ChatController],
})
export class AppModule {}
