import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChatLogDocument = HydratedDocument<ChatLog>;

@Schema()
class Usage {
  @Prop()
  promptTokens: number;

  @Prop()
  completionTokens: number;

  @Prop()
  totalTokens: number;
}

@Schema()
class Message {
  @Prop()
  role: string;

  @Prop()
  content: string;
}

@Schema()
class Choice {
  @Prop()
  message: Message;
  @Prop()
  finishReason: string;
  @Prop()
  index: number;
}

@Schema({ timestamps: true })
export class ChatLog {
  @Prop()
  id: string;

  @Prop()
  object: string;

  @Prop()
  created: string;

  @Prop()
  model: string;

  @Prop()
  usage: Usage;

  @Prop()
  choices: Choice[];
}

export const ChatLogSchema = SchemaFactory.createForClass(ChatLog);
