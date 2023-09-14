import { BaseRepository } from "!domain/base/base.repository";
import { CreatePlaceDTO } from "./dtos/create-place.dto";
import { Place } from "./place";

export interface PlacesRepository
  extends BaseRepository<Place, CreatePlaceDTO> {
  allByCompanyId(companyId: string): Promise<Place[]>;
}
