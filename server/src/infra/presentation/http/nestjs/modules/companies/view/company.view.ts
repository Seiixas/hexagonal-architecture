import { Company } from "!domain/companies/company";
import { PlaceToView, PlaceView } from "../../places/view/place.view";
import { UserView } from "../../users/view/user.view";

export interface CompanyToView {
  id: string;
  name: string;
  website: string;
  cnpj: string;
  places?: PlaceToView[];
  created_at: Date;
  updated_at: Date;
}

export class CompanyView {
  public static ToView(company: Company): CompanyToView {
    return {
      id: company.id,
      name: company.name,
      website: company.website,
      cnpj: company.cnpj,
      ...(company.user && { user: UserView.ToView(company.user) }),
      ...(company.places && {
        places: company.places.map((place) => PlaceView.ToView(place)),
      }),
      created_at: company.createdAt,
      updated_at: company.updatedAt,
    };
  }
}
