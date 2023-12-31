import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { PlaceNotFoundException } from "!modules/companies/errors/place-not-found.exception";

interface UpdatePlaceUseCaseDTO extends Omit<Partial<Place>, "company"> {
  id: string;
}

export class UpdatePlaceService {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute({
    id,
    cep,
    street,
    state,
    number,
    name,
    district,
    city,
  }: UpdatePlaceUseCaseDTO) {
    const place = await this.placesRepository.find({ where: { id } });

    if (!place) throw new PlaceNotFoundException();

    place.cep = cep ?? place.cep;
    place.street = street ?? place.street;
    place.state = state ?? place.state;
    place.number = number ?? place.number;
    place.name = name ?? place.name;
    place.district = district ?? place.district;
    place.city = city ?? place.city;

    await this.placesRepository.update(place, {
      cep,
      street,
      state,
      number,
      name,
      district,
      city,
    });
  }
}
