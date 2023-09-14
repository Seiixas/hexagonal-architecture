import { AppError } from "!shared/errors/app.error";

export class UserNotFoundException extends AppError {
  constructor() {
    super({
      message: "User not found.",
      statusCode: 404,
    });
  }
}
