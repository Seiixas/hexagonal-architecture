import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";
import { PrismaClient } from "@prisma/client";
import { CompanyMapper } from "./company.mapper";

export class CompaniesRepositoryPrisma implements CompaniesRepository {
  constructor(private readonly _repository: PrismaClient) {}
  async update(old: Company, _new: Partial<Company>): Promise<void> {
    const oldCompany = CompanyMapper.toPrisma(old);
    const newCompany = CompanyMapper.toPrisma(_new);

    newCompany.userId = oldCompany.userId;

    await this._repository.company.update({
      data: { ...newCompany, userId: newCompany.userId },
      where: {
        id: oldCompany.id,
      },
    });
  }

  async store(data: Company): Promise<Company> {
    const prismaCompany = CompanyMapper.toPrisma(data);

    const company = await this._repository.company.create({
      data: prismaCompany,
    });

    return CompanyMapper.toLocal(company);
  }

  async find({ where }: { where: Partial<Company> }): Promise<Company> {
    const company = await this._repository.company.findFirst({
      where,
      include: { user: true },
    });

    if (!company) return null;

    return CompanyMapper.toLocal(company);
  }

  async remove(item: Company): Promise<void> {
    const company = CompanyMapper.toPrisma(item);
    await this._repository.company.delete({ where: { id: company.id } });
  }

  async all(): Promise<Company[]> {
    const companies = await this._repository.company.findMany();

    return companies.map((company) => CompanyMapper.toLocal(company));
  }
}
