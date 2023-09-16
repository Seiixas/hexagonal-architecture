import { Company } from "!domain/companies/company";
import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Repository } from "typeorm";
import { CompanyTypeORMEntity } from "../../entities/company.entity";
import { CompanyMapper } from "../company/company.mapper";

export class CompaniesRepositoryTypeORM implements CompaniesRepository {
  constructor(private readonly _repository: Repository<CompanyTypeORMEntity>) {}

  async store(data: Company): Promise<Company> {
    const company = CompanyMapper.toTypeORM(data);

    return CompanyMapper.toLocal(await this._repository.save(company));
  }

  async find({ where }: { where: Partial<Company> }): Promise<Company> {
    const company = await this._repository.findOne({ where });

    return CompanyMapper.toLocal(company);
  }

  async remove(item: Company): Promise<void> {
    await this._repository.delete(item.id);
  }

  async all(): Promise<Company[]> {
    const companies = await this._repository.find();

    return companies.map((company) => CompanyMapper.toLocal(company));
  }
}
