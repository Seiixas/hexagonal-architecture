import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";

export class CompaniesRepositoryInMemory implements CompaniesRepository {
  private companies: Company[] = [];

  async store(company: Company): Promise<Company> {
    this.companies.push(company);

    return company;
  }

  async update(old: Company, _new: Partial<Company>): Promise<void> {
    const companyToUpdate = this.companies.findIndex(
      (company) => company.id === old.id
    );

    this.companies[companyToUpdate].name = _new.name ?? old.name;
    this.companies[companyToUpdate].cnpj = _new.cnpj ?? old.cnpj;
    this.companies[companyToUpdate].website = _new.website ?? old.website;
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
