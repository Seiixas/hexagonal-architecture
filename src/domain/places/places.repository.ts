import { BaseRepository } from "!domain/base/base.repository";
import { Place } from "./place";

export abstract class PlacesRepository extends BaseRepository<Place> {
  abstract allByCompanyId(companyId: string): Promise<Place[]>;
}
