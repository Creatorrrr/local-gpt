import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ConfigDocument = HydratedDocument<Config>;

@Schema({ timestamps: true })
export class Config {
  @Prop()
  modelEngine: string;

  @Prop()
  apiKey: string;

  @Prop()
  temperature: number;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
