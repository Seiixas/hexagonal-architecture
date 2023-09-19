import { Place as PlaceLocal } from "!domain/places/place";
import { PlaceTypeORMEntity as PlaceTypeOrm } from "../../entities/place.entity";
import { CompanyMapper } from "../company/company.mapper";

export class PlaceMapper {
  public static toTypeORM(
    place: PlaceLocal | Partial<PlaceLocal>
  ): PlaceTypeOrm {
    const placeTypeOrm = new PlaceTypeOrm();

    placeTypeOrm.id = place.id;
    placeTypeOrm.name = place.name;
    placeTypeOrm.street = place.street;
    placeTypeOrm.number = place.number;
    placeTypeOrm.district = place.district;
    placeTypeOrm.city = place.city;
    placeTypeOrm.cep = place.cep;
    placeTypeOrm.state = place.state;
    placeTypeOrm.company = place.company;
    placeTypeOrm.createdAt = place.createdAt;
    placeTypeOrm.updatedAt = place.updatedAt;

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
      company: place.company ? CompanyMapper.toLocal(place.company) : null,
    });
  }
}
