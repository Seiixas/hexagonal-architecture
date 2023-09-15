import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { prisma } from "../../connection";
import { PlaceMapper } from "./place.mapper";

export class PlacesRepositoryPrisma implements PlacesRepository {
  async allByCompanyId(companyId: string): Promise<Place[]> {
    const places = await prisma.place.findMany({
      where: { companyId },
    });

    return places.map((place) => PlaceMapper.toLocal(place));
  }

  async store(data: Place): Promise<Place> {
    const place = PlaceMapper.toPrisma(data);
    await prisma.place.create({ data: place });

    return data;
  }

  async find({ where }: { where: Partial<Place> }): Promise<Place> {
    const place = await prisma.place.findFirst({ where });

    return PlaceMapper.toLocal(place);
  }

  async remove(item: Place): Promise<void> {
    const place = PlaceMapper.toPrisma(item);

    await prisma.place.delete({ where: { id: place.id } });
  }

  async all(): Promise<Place[]> {
    const places = await prisma.place.findMany();

    return places.map((place) => PlaceMapper.toLocal(place));
  }
}
