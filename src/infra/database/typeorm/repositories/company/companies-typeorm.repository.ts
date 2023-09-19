import { Company } from "!domain/companies/company";
import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Repository } from "typeorm";
import { CompanyMapper } from "./company.mapper";
import { CompanyTypeORMEntity } from "../../entities/company.entity";

export class CompaniesRepositoryTypeORM implements CompaniesRepository {
  constructor(private readonly _repository: Repository<CompanyTypeORMEntity>) {}

  async store(data: Company): Promise<Company> {
    const company = CompanyMapper.toTypeORM(data);

    return CompanyMapper.toLocal(await this._repository.save(company));
  }

  async find({ where }: { where: Partial<Company> }): Promise<Company> {
    const company = CompanyMapper.toTypeORM(where);

    const companyFound = await this._repository.findOne({
      where: company,
      relations: { places: true },
    });

    if (!companyFound) return null;

    return CompanyMapper.toLocal(companyFound);
  }

  async remove(item: Company): Promise<void> {
    await this._repository.delete(item.id);
  }

  async all(): Promise<Company[]> {
    const companies = await this._repository.find();

    return companies.map((company) => CompanyMapper.toLocal(company));
  }

  async update(old: Company, _new: Partial<Company>): Promise<void> {
    const oldCompany = CompanyMapper.toTypeORM(old);
    const newCompany = CompanyMapper.toTypeORM(_new);

    await this._repository
      .createQueryBuilder()
      .update(oldCompany)
      .set({
        ...newCompany,
      })
      .where("id = :id", { id: oldCompany.id })
      .execute();
  }
}
