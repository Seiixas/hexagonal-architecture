import { BaseRepository } from "!domain/base/base.repository";
import { Place } from "./place";

export interface PlacesRepository extends BaseRepository<Place> {
  allByCompanyId(companyId: string): Promise<Place[]>;
}
