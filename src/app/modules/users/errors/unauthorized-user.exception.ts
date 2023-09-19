import { AppError } from "!shared/errors/app.error";

export class UnauthorizedUserException extends AppError {
  constructor() {
    super({ message: "E-mail or password invalid.", statusCode: 401 });
  }
}
