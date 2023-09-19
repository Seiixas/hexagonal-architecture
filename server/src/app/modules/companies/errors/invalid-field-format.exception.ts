import { AppError } from "!shared/errors/app.error";

interface ConstructorProps {
  fieldName: string;
}

export class InvalidFieldFormatException extends AppError {
  constructor(props: ConstructorProps) {
    super({
      message: `${props.fieldName} invalid format.`,
    });
  }
}
