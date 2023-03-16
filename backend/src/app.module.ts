import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@/modules/config/config.module";
import { ChatModule } from "@/modules/chat/chat.module";
import { FileModule } from "@/modules/file/file.module";
import { DATABASE } from "@/constants/database.constant";

@Module({
  imports: [MongooseModule.forRoot(DATABASE), ConfigModule, ChatModule, FileModule],
})
export class AppModule {}
