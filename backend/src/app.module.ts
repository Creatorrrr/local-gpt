import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatController } from "@/controllers/chat.controller";
import { ConfigController } from "@/controllers/config.controller";
import { ChatServiceImpl } from "@/services/impl/chat.service.impl";
import { FileController } from "@/controllers/file.controller";
import { ConfigServiceImpl } from "@/services/impl/config.service.impl";
import { FileServiceImpl } from "@/services/impl/file.service.impl";
import { Config, ConfigSchema } from "@/schemas/config.schema";
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
  controllers: [ConfigController, ChatController, FileController],
  providers: [ConfigServiceImpl, ChatServiceImpl, FileServiceImpl],
})
export class AppModule {}
