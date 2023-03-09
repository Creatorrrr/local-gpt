import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  role: string;

  @Prop()
  content: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
