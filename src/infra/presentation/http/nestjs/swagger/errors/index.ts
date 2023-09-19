import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";
import { InvalidFieldFormatException } from "!modules/companies/errors/invalid-field-format.exception";
import { PlaceNotFoundException } from "!modules/companies/errors/place-not-found.exception";
import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";
import { UnauthorizedUserException } from "!modules/users/errors/unauthorized-user.exception";
import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";

export const USER_NOT_FOUND_EXCEPTION = new UserNotFoundException();
export const EMAIL_UNAVAILABLE_EXCEPTION = new EmailUnavailableException();
export const UNAUTHORIZED_USER_EXCEPTION = new UnauthorizedUserException();

export const COMPANY_NOT_FOUND_EXCEPTION = new CompanyNotFoundException();
export const PLACE_NOT_FOUND_EXCEPTION = new PlaceNotFoundException();

export const INVALID_CNPJ_FORMAT_EXCEPTION = new InvalidFieldFormatException({
  fieldName: "CNPJ",
});
export const INVALID_WEBSITE_FORMAT_EXCEPTION = new InvalidFieldFormatException(
  {
    fieldName: "Website",
  }
);
