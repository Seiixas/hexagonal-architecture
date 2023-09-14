import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";
import { UsersRepository } from "!domain/users/users.repository";
import { CNPJUnavailableException } from "!modules/companies/errors/cnpj-unavailable.exception";
import { InvalidFieldFormatException } from "!modules/companies/errors/invalid-field-format.exception";

import { Validation } from "!modules/companies/utils/validation";
import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";

interface CreateCompanyUseCaseDTO {
  name: string;
  website: string;
  cnpj: string;
  userId: string;
}

export class CreateCompanyService {
  constructor(
    private readonly companiesRepository: CompaniesRepository,
    private readonly usersRepository: UsersRepository
  ) {}
  async execute({
    name,
    userId,
    website,
    cnpj,
  }: CreateCompanyUseCaseDTO): Promise<Company> {
    const user = await this.usersRepository.find({ where: { id: userId } });

    if (!user) throw new UserNotFoundException();

    if (!Validation.isCNPJ(cnpj))
      throw new InvalidFieldFormatException({ fieldName: "CNPJ" });

    if (!Validation.isWebsite(website))
      throw new InvalidFieldFormatException({ fieldName: "Website" });

    const companyAlreadyExists = await this.companiesRepository.find({
      where: { cnpj },
    });

    if (companyAlreadyExists) throw new CNPJUnavailableException();

    const company = new Company({
      name,
      website,
      cnpj,
      user,
    });

    return await this.companiesRepository.store(company);
  }
}
