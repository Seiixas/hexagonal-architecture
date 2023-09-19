import { PlacesRepository } from "!domain/places/places.repository";
import { PlaceNotFoundException } from "!modules/companies/errors/place-not-found.exception";

export class DeletePlaceService {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute(placeId: string): Promise<void> {
    const place = await this.placesRepository.find({ where: { id: placeId } });

    if (!place) throw new PlaceNotFoundException();

    await this.placesRepository.remove(place);
  }
}
