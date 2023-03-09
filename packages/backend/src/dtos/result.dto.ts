/**
 * 결과값 DTO
 */
export class ResultDto<T> {
  readonly statusCode: number;
  readonly message: string;
  readonly result: any;

  constructor(_statusCode: number, _message: string, _result?: T) {
    this.statusCode = _statusCode;
    this.message = _message;
    this.result = _result;
  }
}
