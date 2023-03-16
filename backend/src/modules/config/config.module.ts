import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Config, ConfigSchema } from "@/schemas/config.schema";
import { ConfigController } from "@/modules/config/controllers/config.controller";
import { ConfigServiceImpl } from "@/modules/config/services/impls/config.service.impl";

@Module({
  imports: [MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }])],
  controllers: [ConfigController],
  providers: [ConfigServiceImpl],
})
export class ConfigModule {}
