import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";
import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";

export class ShowCompanyService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async execute(companyId: string): Promise<Company> {
    const company = await this.companiesRepository.find({
      where: { id: companyId },
    });

    if (!company) throw new CompanyNotFoundException();

    return company;
  }
}
