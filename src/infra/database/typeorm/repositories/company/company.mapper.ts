import { Company as CompanyLocal } from "!domain/companies/company";
import { CompanyTypeORMEntity as CompanyTypeOrm } from "../../entities/company.entity";
import { PlaceMapper } from "../place/place.mapper";

export class CompanyMapper {
  public static toTypeORM(company: CompanyLocal): CompanyTypeOrm {
    const userTypeOrm = new CompanyTypeOrm();

    Object.assign(userTypeOrm, company);

    return userTypeOrm;
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
