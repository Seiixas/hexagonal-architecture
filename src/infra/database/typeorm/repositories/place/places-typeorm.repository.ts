import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { Repository } from "typeorm";
import { PlaceMapper } from "../place/place.mapper";
import { PlaceTypeORMEntity } from "../../entities/place.entity";

export class PlacesRepositoryTypeORM implements PlacesRepository {
  constructor(private readonly _repository: Repository<PlaceTypeORMEntity>) {}

  async store(data: Place): Promise<Place> {
    const place = PlaceMapper.toTypeORM(data);

    return PlaceMapper.toLocal(await this._repository.save(place));
  }

  async find({ where }: { where: Partial<Place> }): Promise<Place> {
    const place = await this._repository.findOne({ where });

    if (!place) return null;

    return PlaceMapper.toLocal(place);
  }

  async remove(item: Place): Promise<void> {
    await this._repository.delete(item.id);
  }

  async all(): Promise<Place[]> {
    const places = await this._repository
      .createQueryBuilder("places")
      .leftJoinAndSelect("places.company", "company")
      .getMany();

    return places.map((place) => PlaceMapper.toLocal(place));
  }

  async allByCompanyId(companyId: string): Promise<Place[]> {
    const places = await this._repository.find({ where: { id: companyId } });

    return places.map((place) => PlaceMapper.toLocal(place));
  }

  async update(old: Place, _new: Partial<Place>): Promise<void> {
    const oldPlace = PlaceMapper.toTypeORM(old);
    const newPlace = PlaceMapper.toTypeORM(_new);

    await this._repository
      .createQueryBuilder()
      .update(oldPlace)
      .set({
        ...newPlace,
      })
      .where("id = :id", { id: oldPlace.id })
      .execute();
  }
}
