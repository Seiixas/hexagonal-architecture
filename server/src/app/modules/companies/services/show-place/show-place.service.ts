import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { PlaceNotFoundException } from "!modules/companies/errors/place-not-found.exception";

export class ShowPlaceService {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute(placeId: string): Promise<Place> {
    const place = await this.placesRepository.find({ where: { id: placeId } });

    if (!place) throw new PlaceNotFoundException();

    return place;
  }
}
