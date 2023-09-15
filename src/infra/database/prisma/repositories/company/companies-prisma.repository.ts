import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";
import { prisma } from "../../connection";
import { CompanyMapper } from "./company.mapper";

export class CompaniesRepositoryPrisma implements CompaniesRepository {
  async store(data: Company): Promise<Company> {
    const company = await prisma.company.create({
      data: {
        name: data.name,
        userId: data.user.id,
        website: data.website,
        cnpj: data.cnpj,
      },
    });

    return CompanyMapper.toLocal(company);
  }

  async find({ where }: { where: Partial<Company> }): Promise<Company> {
    const company = await prisma.company.findFirst({
      where,
      include: { user: true },
    });

    return CompanyMapper.toLocal(company);
  }

  async remove(item: Company): Promise<void> {
    const company = CompanyMapper.toPrisma(item);
    await prisma.company.delete({ where: { id: company.id } });
  }

  async all(): Promise<Company[]> {
    const companies = await prisma.company.findMany();

    return companies.map((company) => CompanyMapper.toLocal(company));
  }
}
