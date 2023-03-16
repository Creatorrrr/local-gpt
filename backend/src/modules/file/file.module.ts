import { Module } from "@nestjs/common";
import { FileController } from "@/modules/file/controllers/file.controller";
import { FileServiceImpl } from "@/modules/file/services/impls/file.service.impl";

@Module({
  controllers: [FileController],
  providers: [FileServiceImpl],
})
export class FileModule {}
