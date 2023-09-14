import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";

export class PlacesRepositoryInMemory implements PlacesRepository {
  private places: Place[] = [];

  async store(place: Place): Promise<Place> {
    this.places.push(place);

    return place;
  }

  async find({ where }: { where: Partial<Place> }): Promise<Place> {
    const foundPlace = this.places.find((places) => {
      return (
        (where.name === undefined || places.name === where.name) &&
          (where.cep === undefined || places.cep === where.cep) &&
          (where.city === undefined || places.city === where.city) &&
          (where.company === undefined || places.company === where.company),
        where.createdAt === undefined || places.createdAt === where.createdAt,
        where.district === undefined || places.district === where.district,
        where.id === undefined || places.id === where.id,
        where.number === undefined || places.number === where.number,
        where.state === undefined || places.state === where.state,
        where.street === undefined || places.street === where.street,
        where.updatedAt === undefined || places.updatedAt === where.updatedAt
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
