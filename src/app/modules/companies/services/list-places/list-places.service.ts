import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";

export class ListPlacesService {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute(companyId?: string): Promise<Place[]> {
    if (companyId) return await this.placesRepository.allByCompanyId(companyId);

    return await this.placesRepository.all();
  }
}
