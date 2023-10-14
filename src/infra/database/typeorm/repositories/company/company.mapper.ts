import { Company as CompanyLocal } from "!domain/companies/company";
import { CompanyTypeORMEntity as CompanyTypeOrm } from "../../entities/company.entity";
import { PlaceMapper } from "../place/place.mapper";

export class CompanyMapper {
  public static toTypeORM(
    company: CompanyLocal | Partial<CompanyLocal>
  ): CompanyTypeOrm {
    const companyTypeOrm = new CompanyTypeOrm();

    companyTypeOrm.id = company.id;
    companyTypeOrm.name = company.name;
    companyTypeOrm.cnpj = company.cnpj;
    companyTypeOrm.website = company.website;
    companyTypeOrm.createdAt = company.createdAt;
    companyTypeOrm.updatedAt = company.updatedAt;

    return companyTypeOrm;
  }

  public static toLocal(company: CompanyTypeOrm): CompanyLocal {
    return new CompanyLocal({
      id: company.id,
      name: company.name,
      website: company.website,
      cnpj: company.cnpj,
      places: company.places
        ? company.places.map((place) => PlaceMapper.toLocal(place))
        : null,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    });
  }
}
