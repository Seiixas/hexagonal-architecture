import { Place } from "!domain/places/place";
import { CompanyToView, CompanyView } from "../../companies/view/company.view";

export interface PlaceToView {
  id: string;
  name: string;
  state: string;
  street: string;
  number: string;
  district: string;
  company?: CompanyToView;
  city: string;
  cep: string;
  updated_at: Date;
  created_at: Date;
}
export class PlaceView {
  public static ToView(place: Place) {
    return {
      id: place.id,
      name: place.name,
      state: place.state,
      street: place.street,
      number: place.number,
      district: place.district,
      ...(place.company && { company: CompanyView.ToView(place.company) }),
      city: place.city,
      cep: place.cep,
      updated_at: place.createdAt,
      created_at: place.updatedAt,
    };
  }
}
