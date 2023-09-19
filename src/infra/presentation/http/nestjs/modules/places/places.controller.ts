import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { CreatePlaceService } from "!modules/companies/services/create-place/create-place.service";
import { ShowPlaceService } from "!modules/companies/services/show-place/show-place.service";
import { ListPlacesService } from "!modules/companies/services/list-places/list-places.service";
import { DeletePlaceService } from "!modules/companies/services/delete-place/delete-place.service";
import { UpdatePlaceService } from "!modules/companies/services/update-place/update-place.service";
import { StoreBodyDTO, UpdateBodyDTO } from "./dtos/controller.dto";
import { PlaceToView, PlaceView } from "./view/place.view";

@Controller("places")
export class PlacesController {
  constructor(
    private readonly createPlaceService: CreatePlaceService,
    private readonly showPlaceService: ShowPlaceService,
    private readonly listPlacesService: ListPlacesService,
    private readonly deletePlaceService: DeletePlaceService,
    private readonly updatePlaceService: UpdatePlaceService
  ) {}

  @Post()
  async create(@Body() createPlaceDto: StoreBodyDTO): Promise<PlaceToView> {
    return PlaceView.ToView(
      await this.createPlaceService.execute(createPlaceDto)
    );
  }

  @Get()
  async all(): Promise<PlaceToView[]> {
    const places = await this.listPlacesService.execute();
    return places.map((place) => PlaceView.ToView(place));
  }

  @Get("/:placeId")
  async profile(@Param("placeId") placeId: string): Promise<PlaceToView> {
    return PlaceView.ToView(await this.showPlaceService.execute(placeId));
  }

  @Put("/:placeId")
  async update(
    @Param("placeId") placeId: string,
    @Body() updatePlaceDto: UpdateBodyDTO
  ): Promise<void> {
    return await this.updatePlaceService.execute({
      id: placeId,
      ...updatePlaceDto,
    });
  }

  @Delete("/:placeId")
  async delete(@Param("placeId") placeId: string): Promise<void> {
    return await this.deletePlaceService.execute(placeId);
  }
}
