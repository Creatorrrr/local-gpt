export class ResultType {
  private readonly _status: number;
  private readonly _message: string;
  private readonly _error: new () => Error;

  constructor(status: number, message: string, error?: new () => Error) {
    this._status = status;
    this._message = message;
    this._error = error;
  }

  public get status(): number {
    return this._status;
  }

  public get message(): string {
    return this._message;
  }

  public get error(): new () => Error {
    return this._error;
  }
}
