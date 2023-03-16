import { IsNumber, IsString } from "class-validator";
import { AbstractCommonDto } from "@/dtos/abstract-common.dto";
import { ApiProperty } from "@nestjs/swagger";
import { MODEL_ENGINE, TEMPERATURE } from "@/constants/openai.constant";
import { isReadable, Readable } from "stream";

/**
 * 파일 DTO
 */
export class FileDto extends AbstractCommonDto {
  constructor({
    fieldname,
    originalname,
    encoding,
    mimetype,
    size,
    stream,
    destination,
    filename,
    path,
    buffer,
  }: {
    fieldname?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    size?: number;
    stream?: Readable;
    destination?: string;
    filename?: string;
    path?: string;
    buffer?: Buffer;
  } = {}) {
    super();
    this.fieldname = fieldname;
    this.originalname = originalname;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.size = size;
    this.stream = stream;
    this.destination = destination;
    this.filename = filename;
    this.path = path;
    this.buffer = buffer;
  }
  @IsString()
  fieldname: string;

  @IsString()
  originalname: string;

  @IsString()
  encoding: string;

  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;

  stream: Readable;

  @IsString()
  destination: string;

  @IsString()
  filename: string;

  @IsString()
  path: string;

  buffer: Buffer;
}
