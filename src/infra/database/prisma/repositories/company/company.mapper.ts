import { Company as CompanyLocal } from "!domain/companies/company";
import { Company as CompanyPrisma, Place as PlacePrisma } from "@prisma/client";
import { User as UserPrisma } from "@prisma/client";
import { UserMapper } from "../user/user.mapper";

interface CompanyPrismaInterface extends CompanyPrisma {
  user?: UserPrisma;
  places?: PlacePrisma;
}

export class CompanyMapper {
  public static toPrisma(
    company: CompanyLocal | Partial<CompanyLocal>
  ): CompanyPrisma {
    return {
      id: company.id,
      name: company.name,
      website: company.website,
      cnpj: company.cnpj,
      created_at: company.createdAt,
      updated_at: company.updatedAt,
      userId: company.user ? company.user.id : null,
    };
  }

  public static toLocal(company: CompanyPrismaInterface): CompanyLocal {
    return new CompanyLocal({
      id: company.id,
      name: company.name,
      website: company.website,
      cnpj: company.cnpj,
      user: company.user ? UserMapper.toLocal(company.user) : null,
      updatedAt: company.updated_at,
      createdAt: company.created_at,
    });
  }
}
