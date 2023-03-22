import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { File, FileSchema } from "@/schemas/file.schema";
import { FileController } from "@/modules/file/controllers/file.controller";
import { FileServiceImpl } from "@/modules/file/services/impls/file.service.impl";

@Module({
  imports: [MongooseModule.forFeature([{ name: File.name, schema: FileSchema }])],
  controllers: [FileController],
  providers: [FileServiceImpl],
})
export class FileModule {}
