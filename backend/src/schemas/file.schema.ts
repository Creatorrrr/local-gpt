import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File {
  @Prop()
  fieldname: string;

  @Prop()
  originalname: string;

  @Prop()
  encoding: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;

  @Prop()
  filename: string;

  @Prop()
  path: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
