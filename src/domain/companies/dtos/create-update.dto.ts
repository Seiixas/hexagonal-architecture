import { User } from "!domain/users/user";

export interface CreateCompanyDTO {
  name: string;
  website: string;
  cnpj: string;
  user: User;
}
