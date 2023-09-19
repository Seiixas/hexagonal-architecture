import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";

export class PlacesRepositoryInMemory implements PlacesRepository {
  private places: Place[] = [];

  async store(place: Place): Promise<Place> {
    this.places.push(place);

    return place;
  }

  async update(old: Place, _new: Partial<Place>): Promise<void> {
    const placeToUpdate = this.places.findIndex((place) => place.id === old.id);

    this.places[placeToUpdate].cep = _new.cep ?? old.cep;
    this.places[placeToUpdate].name = _new.name ?? old.name;
    this.places[placeToUpdate].street = _new.street ?? old.street;
    this.places[placeToUpdate].district = _new.district ?? old.district;
    this.places[placeToUpdate].state = _new.cep ?? old.state;
    this.places[placeToUpdate].city = _new.city ?? old.city;
    this.places[placeToUpdate].number = _new.number ?? old.number;
    this.places[placeToUpdate].company = _new.company ?? old.company;
  }

  async find({ where }: { where: Partial<Place> }): Promise<Place | null> {
    const foundPlace = this.places.find((place) => {
      return (
        (where.name === undefined || place.name === where.name) &&
        (where.cep === undefined || place.cep === where.cep) &&
        (where.city === undefined || place.city === where.city) &&
        (where.company === undefined || place.company === where.company) &&
        (where.createdAt === undefined ||
          place.createdAt === where.createdAt) &&
        (where.district === undefined || place.district === where.district) &&
        (where.id === undefined || place.id === where.id) &&
        (where.number === undefined || place.number === where.number) &&
        (where.state === undefined || place.state === where.state) &&
        (where.street === undefined || place.street === where.street) &&
        (where.updatedAt === undefined || place.updatedAt === where.updatedAt)
      );
    });

    return foundPlace || null;
  }

  async remove(item: Place): Promise<void> {
    const placePosition = this.places.findIndex((p) => p === item);
    this.places.splice(placePosition, 1);
  }

  async all(): Promise<Place[]> {
    return this.places;
  }

  async allByCompanyId(companyId: string): Promise<Place[]> {
    return this.places.filter((place) => place.company.id === companyId);
  }
}
