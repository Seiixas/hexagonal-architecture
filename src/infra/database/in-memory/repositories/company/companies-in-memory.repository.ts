import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";

export class CompaniesRepositoryInMemory implements CompaniesRepository {
  update(old: Company, _new: Partial<Company>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private companies: Company[] = [];

  async store(company: Company): Promise<Company> {
    this.companies.push(company);

    return company;
  }

  async find({ where }: { where: Partial<Company> }): Promise<Company> {
    const foundCompany = this.companies.find((company) => {
      return (
        (where.name === undefined || company.name === where.name) &&
        (where.website === undefined || company.website === where.website) &&
        (where.cnpj === undefined || company.cnpj === where.cnpj)
      );
    });

    return foundCompany || null;
  }

  async remove(company: Company): Promise<void> {
    const companyPosition = this.companies.findIndex((c) => c === company);
    this.companies.splice(companyPosition, 1);
  }

  async all(): Promise<Company[]> {
    return this.companies;
  }
}
