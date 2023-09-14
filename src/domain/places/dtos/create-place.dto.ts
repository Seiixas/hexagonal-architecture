import { Company } from "!domain/companies/company";

export interface CreatePlaceDTO {
  name: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  company: Company;
}
