interface ConstructorProps {
  message: string;
  statusCode?: number;
}

export class AppError {
  protected readonly _message: string;
  protected readonly _statusCode: number;

  constructor(props: ConstructorProps) {
    this._message = props.message;
    this._statusCode = props.statusCode ?? 400;
  }

  get message(): string {
    return this._message;
  }

  get statusCode(): number {
    return this._statusCode;
  }
}
