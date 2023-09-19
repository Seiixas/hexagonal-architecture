import { AppError } from "!shared/errors/app.error";

export class PlaceNotFoundException extends AppError {
  constructor() {
    super({
      message: "Place not found.",
      statusCode: 404,
    });
  }
}
