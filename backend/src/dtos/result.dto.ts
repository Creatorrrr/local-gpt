import { AbstractCommonDto } from "@/abstracts/abstract-common.dto";
import { CommonUtil } from "@/utils/common.util";

/**
 * 결과값 DTO
 */
export class ResultDto<T> extends AbstractCommonDto {
  readonly _statusCode: number;
  readonly _message: string;
  readonly _result: T;

  constructor(statusCode: number, message: string, result?: T) {
    super();
    this._statusCode = statusCode;
    this._message = message;
    this._result = result;
  }
}
