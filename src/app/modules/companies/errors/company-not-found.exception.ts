import { AppError } from "!shared/errors/app.error";

export class CompanyNotFoundException extends AppError {
  constructor() {
    super({
      message: "Company not found.",
      statusCode: 404,
    });
  }
}
