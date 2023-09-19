import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { PrismaClient } from "@prisma/client";
import { PlaceMapper } from "./place.mapper";

export class PlacesRepositoryPrisma implements PlacesRepository {
  constructor(private readonly _repository: PrismaClient) {}

  async update(old: Place, _new: Partial<Place>): Promise<void> {
    const oldPlace = PlaceMapper.toPrisma(old);
    const newPlace = PlaceMapper.toPrisma(_new);

    await this._repository.place.update({
      data: { ...newPlace },
      where: {
        id: oldPlace.id,
      },
    });
  }

  async allByCompanyId(companyId: string): Promise<Place[]> {
    const places = await this._repository.place.findMany({
      where: { companyId },
    });

    return places.map((place) => PlaceMapper.toLocal(place));
  }

  async store(data: Place): Promise<Place> {
    const place = PlaceMapper.toPrisma(data);
    await this._repository.place.create({ data: place });

    return data;
  }

  async find({ where }: { where: Partial<Place> }): Promise<Place> {
    const place = await this._repository.place.findFirst({ where });

    if (!place) return null;

    return PlaceMapper.toLocal(place);
  }

  async remove(item: Place): Promise<void> {
    const place = PlaceMapper.toPrisma(item);

    await this._repository.place.delete({ where: { id: place.id } });
  }

  async all(): Promise<Place[]> {
    const places = await this._repository.place.findMany();

    return places.map((place) => PlaceMapper.toLocal(place));
  }
}
