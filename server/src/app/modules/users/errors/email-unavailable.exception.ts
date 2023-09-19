import { AppError } from "!shared/errors/app.error";

export class EmailUnavailableException extends AppError {
  constructor() {
    super({
      message: "This e-mail are unavailable.",
    });
  }
}
