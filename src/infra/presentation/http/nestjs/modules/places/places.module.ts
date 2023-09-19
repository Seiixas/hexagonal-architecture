import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { CreatePlaceService } from "!modules/companies/services/create-place/create-place.service";
import { PlacesRepository } from "!domain/places/places.repository";
import { ListPlacesService } from "!modules/companies/services/list-places/list-places.service";
import { UpdatePlaceService } from "!modules/companies/services/update-place/update-place.service";
import { ShowPlaceService } from "!modules/companies/services/show-place/show-place.service";
import { DeletePlaceService } from "!modules/companies/services/delete-place/delete-place.service";
import { CompaniesRepository } from "!domain/companies/companies.repository";
import { PlacesController } from "./places.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [PlacesController],
  providers: [
    {
      provide: CreatePlaceService,
      useFactory: (
        placesRepository: PlacesRepository,
        companiesRepository: CompaniesRepository
      ) => {
        return new CreatePlaceService(placesRepository, companiesRepository);
      },
      inject: [PlacesRepository, CompaniesRepository],
    },
    {
      provide: ListPlacesService,
      useFactory: (placesRepository: PlacesRepository) => {
        return new ListPlacesService(placesRepository);
      },
      inject: [PlacesRepository],
    },
    {
      provide: UpdatePlaceService,
      useFactory: (placesRepository: PlacesRepository) => {
        return new UpdatePlaceService(placesRepository);
      },
      inject: [PlacesRepository],
    },
    {
      provide: ShowPlaceService,
      useFactory: (placesRepository: PlacesRepository) => {
        return new ShowPlaceService(placesRepository);
      },
      inject: [PlacesRepository],
    },
    {
      provide: DeletePlaceService,
      useFactory: (placesRepository: PlacesRepository) => {
        return new DeletePlaceService(placesRepository);
      },
      inject: [PlacesRepository],
    },
  ],
})
export class PlacesModule {}
