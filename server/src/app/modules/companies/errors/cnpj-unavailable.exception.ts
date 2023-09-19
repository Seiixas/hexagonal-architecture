import { AppError } from "!shared/errors/app.error";

export class CNPJUnavailableException extends AppError {
  constructor() {
    super({
      message: "This CNPJ are unavailable.",
    });
  }
}
