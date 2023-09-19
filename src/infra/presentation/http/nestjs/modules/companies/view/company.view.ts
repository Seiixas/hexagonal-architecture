import { Company } from "!domain/companies/company";
import { PlaceView } from "../../places/view/place.view";
import { UserView } from "../../users/view/user.view";

export class CompanyView {
  public static ToView(company: Company) {
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
