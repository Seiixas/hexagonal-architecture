import { CompaniesRepository } from "!domain/companies/companies.repository";
import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";

export class DeleteCompanyService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async execute(companyId: string): Promise<void> {
    const company = await this.companiesRepository.find({
      where: { id: companyId },
    });

    if (!company) throw new CompanyNotFoundException();

    await this.companiesRepository.remove(company);
  }
}
