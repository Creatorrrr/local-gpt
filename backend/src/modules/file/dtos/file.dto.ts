import { IsNumber, IsString } from "class-validator";
import { AbstractCommonDto } from "@/abstracts/abstract-common.dto";

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
    destination,
    filename,
    path,
  }: {
    fieldname?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    size?: number;
    destination?: string;
    filename?: string;
    path?: string;
  } = {}) {
    super();
    this.fieldname = fieldname;
    this._originalname = originalname;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.size = size;
    this.destination = destination;
    this.filename = filename;
    this.path = path;
  }
  @IsString()
  fieldname: string;

  @IsString()
  private _originalname: string;

  @IsString()
  encoding: string;

  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;

  @IsString()
  destination: string;

  @IsString()
  filename: string;

  @IsString()
  path: string;

  get originalname() {
    return this._originalname;
  }

  set originalname(originalname) {
    const encodedOriginalName =
      typeof originalname === "string" ? Buffer.from(originalname, "latin1").toString("utf-8") : "empty";

    this._originalname = encodedOriginalName;
  }
}
