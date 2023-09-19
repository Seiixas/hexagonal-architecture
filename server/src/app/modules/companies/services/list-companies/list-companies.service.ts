import { CompaniesRepository } from "!domain/companies/companies.repository";

export class ListCompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async execute() {
    return await this.companiesRepository.all();
  }
}
