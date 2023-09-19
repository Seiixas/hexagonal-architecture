import { Place } from "!domain/places/place";
import { CompanyView } from "../../companies/view/company.view";

export class PlaceView {
  public static ToView(place: Place) {
    return {
      id: place.id,
      name: place.name,
      state: place.state,
      street: place.street,
      number: place.number,
      district: place.district,
      ...(place.company && CompanyView.ToView(place.company)),
      city: place.city,
      cep: place.cep,
      updated_at: place.createdAt,
      created_at: place.updatedAt,
    };
  }
}
