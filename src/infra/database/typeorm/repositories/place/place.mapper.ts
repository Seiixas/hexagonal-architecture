import { Place as PlaceLocal } from "!domain/places/place";
import { PlaceTypeORMEntity as PlaceTypeOrm } from "../../entities/place.entity";
import { CompanyMapper } from "../company/company.mapper";

export class PlaceMapper {
  public static toTypeORM(place: PlaceLocal): PlaceTypeOrm {
    const placeTypeOrm = new PlaceTypeOrm();

    Object.assign(placeTypeOrm, place);

    return placeTypeOrm;
  }

  public static toLocal(place: PlaceTypeOrm): PlaceLocal {
    return new PlaceLocal({
      id: place.id,
      street: place.street,
      state: place.state,
      number: place.number,
      name: place.name,
      district: place.district,
      createdAt: place.createdAt,
      updatedAt: place.updatedAt,
      city: place.city,
      cep: place.cep,
      company: CompanyMapper.toLocal(place.company) ?? null,
    });
  }
}
