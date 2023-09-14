import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";
import { CreateCompanyDTO } from "!domain/companies/dtos/create-update.dto";
import { CNPJUnavailableException } from "!modules/companies/errors/cnpj-unavailable.exception";
import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";
import { InvalidFieldFormatException } from "!modules/companies/errors/invalid-field-format.exception";
import { Validation } from "!modules/companies/utils/validation";

interface UpdateCompanyUseCaseDTO
  extends Omit<Partial<CreateCompanyDTO>, "user"> {
  id: string;
}

export class UpdateCompanyService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async execute({
    id,
    name,
    website,
    cnpj,
  }: UpdateCompanyUseCaseDTO): Promise<Company> {
    if (cnpj && !Validation.isCNPJ(cnpj))
      throw new InvalidFieldFormatException({
        fieldName: "CNPJ",
      });

    if (website && !Validation.isWebsite(website))
      throw new InvalidFieldFormatException({
        fieldName: "Website",
      });

    const company = await this.companiesRepository.find({ where: { id } });

    if (!company) throw new CompanyNotFoundException();

    if (cnpj) {
      const cnpjFormatted = Validation.isCNPJ(cnpj);

      const companyAlreadyExists = await this.companiesRepository.find({
        where: { cnpj: cnpjFormatted },
      });

      if (companyAlreadyExists) throw new CNPJUnavailableException();
    }

    company.name = name ?? company.name;
    company.website = website ?? company.website;
    company.cnpj = Validation.isCNPJ(cnpj) ?? company.cnpj;

    return await this.companiesRepository.store(company);
  }
}
