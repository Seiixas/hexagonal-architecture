import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";

import { CreatePlaceService } from "!modules/companies/services/create-place/create-place.service";
import { ShowPlaceService } from "!modules/companies/services/show-place/show-place.service";
import { ListPlacesService } from "!modules/companies/services/list-places/list-places.service";
import { DeletePlaceService } from "!modules/companies/services/delete-place/delete-place.service";
import { UpdatePlaceService } from "!modules/companies/services/update-place/update-place.service";
import { StorePlaceDTO, UpdatePlaceDTO } from "./dtos/controller.dto";
import { PlaceToView, PlaceView } from "./view/place.view";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  COMPANY_NOT_FOUND_EXCEPTION,
  PLACE_NOT_FOUND_EXCEPTION,
  UNAUTHORIZED_USER_EXCEPTION,
} from "../../swagger/errors";
@UseGuards(JwtAuthGuard)
@ApiTags("places")
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
  @ApiResponse({
    status: COMPANY_NOT_FOUND_EXCEPTION.statusCode,
    description: COMPANY_NOT_FOUND_EXCEPTION.message,
  })
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiCreatedResponse({
    description: "Place created",
  })
  @ApiBadRequestResponse({
    description: "Body fields incorrect",
  })
  async create(@Body() createPlaceDto: StorePlaceDTO): Promise<PlaceToView> {
    return PlaceView.ToView(
      await this.createPlaceService.execute(createPlaceDto)
    );
  }

  @Get()
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  async all(): Promise<PlaceToView[]> {
    const places = await this.listPlacesService.execute();
    return places.map((place) => PlaceView.ToView(place));
  }

  @Get("/:placeId")
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiResponse({
    status: PLACE_NOT_FOUND_EXCEPTION.statusCode,
    description: PLACE_NOT_FOUND_EXCEPTION.message,
  })
  async profile(@Param("placeId") placeId: string): Promise<PlaceToView> {
    return PlaceView.ToView(await this.showPlaceService.execute(placeId));
  }

  @Put("/:placeId")
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiResponse({
    status: PLACE_NOT_FOUND_EXCEPTION.statusCode,
    description: PLACE_NOT_FOUND_EXCEPTION.message,
  })
  @ApiBadRequestResponse({
    description: "Body fields incorrect",
  })
  async update(
    @Param("placeId") placeId: string,
    @Body() updatePlaceDto: UpdatePlaceDTO
  ): Promise<void> {
    return await this.updatePlaceService.execute({
      id: placeId,
      ...updatePlaceDto,
    });
  }

  @Delete("/:placeId")
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiResponse({
    status: PLACE_NOT_FOUND_EXCEPTION.statusCode,
    description: PLACE_NOT_FOUND_EXCEPTION.message,
  })
  async delete(@Param("placeId") placeId: string): Promise<void> {
    return await this.deletePlaceService.execute(placeId);
  }
}
