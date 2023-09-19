import { dataSource } from "!infra/database/typeorm/connection";
import { DataSource } from "typeorm";
import { Test } from "@nestjs/testing";

import { PlacesController } from "./places.controller";
import { ListPlacesService } from "!modules/companies/services/list-places/list-places.service";
import { CreatePlaceService } from "!modules/companies/services/create-place/create-place.service";
import { UpdatePlaceService } from "!modules/companies/services/update-place/update-place.service";
import { DeletePlaceService } from "!modules/companies/services/delete-place/delete-place.service";
import { ShowPlaceService } from "!modules/companies/services/show-place/show-place.service";
import { PlacesRepositoryTypeORM } from "!infra/database/typeorm/repositories/place/places-typeorm.repository";
import { PlaceTypeORMEntity } from "!infra/database/typeorm/entities/place.entity";
import { CompanyTypeORMEntity } from "!infra/database/typeorm/entities/company.entity";
import { CompaniesRepositoryTypeORM } from "!infra/database/typeorm/repositories/company/companies-typeorm.repository";
import { Company } from "!domain/companies/company";
import { PlaceNotFoundException } from "!modules/companies/errors/place-not-found.exception";

let connection: DataSource;
let placesController: PlacesController;
let placeId: string;

let company: Company;

describe("Places Controller", () => {
  beforeAll(async () => {
    connection = await dataSource.initialize();
    await connection.runMigrations();

    const placesRepository = new PlacesRepositoryTypeORM(
      connection.getRepository(PlaceTypeORMEntity)
    );
    const companiesRepository = new CompaniesRepositoryTypeORM(
      connection.getRepository(CompanyTypeORMEntity)
    );

    const listPlacesService = new ListPlacesService(placesRepository);
    const createPlaceService = new CreatePlaceService(
      placesRepository,
      companiesRepository
    );
    const updatePlaceService = new UpdatePlaceService(placesRepository);
    const deletePlaceService = new DeletePlaceService(placesRepository);
    const showPlaceService = new ShowPlaceService(placesRepository);

    const app = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [
        {
          provide: CreatePlaceService,
          useValue: createPlaceService,
        },
        {
          provide: ListPlacesService,
          useValue: listPlacesService,
        },
        {
          provide: UpdatePlaceService,
          useValue: updatePlaceService,
        },
        {
          provide: ShowPlaceService,
          useValue: showPlaceService,
        },
        {
          provide: DeletePlaceService,
          useValue: deletePlaceService,
        },
      ],
    }).compile();

    const companyToCreate = new Company({
      name: "My Company",
      website: "https://www.company.com",
      cnpj: "40.956.311/0001-10",
    });

    company = await companiesRepository.store(companyToCreate);

    placesController = app.get<PlacesController>(PlacesController);
  });

  afterAll(async () => {
    await connection.dropDatabase();
  });

  it("should be able to create place", async () => {
    const place = await placesController.create({
      name: "Main",
      street: "street",
      state: "MG",
      number: "250A",
      district: "Center",
      companyId: company.id,
      city: "city",
      cep: "00000-000",
    });

    placeId = place.id;

    expect(place).toBeDefined();
    expect(place).toHaveProperty("_id");
  });

  it("should be able to list all places", async () => {
    const places = await placesController.all();

    expect(places).toHaveLength(1);
  });

  it("should be able show a place profile", async () => {
    const place = await placesController.profile(placeId);

    expect(place).toBeDefined();
  });

  it("should be able to update a place", async () => {
    await placesController.update(placeId, {
      name: "Second Place",
    });

    const userUpdated = await placesController.profile(placeId);

    expect(userUpdated).toBeDefined();
    expect(userUpdated).toHaveProperty("name");
    expect(userUpdated.name).toEqual("Second Place");
  });

  it("should be able delete a place profile", async () => {
    await placesController.delete(placeId);

    const places = await placesController.all();

    expect(places).toHaveLength(0);
  });

  it("should not be able to show a place profile that does not exists ", () => {
    expect(async () => {
      await placesController.profile("fake-id");
    }).rejects.toBeInstanceOf(PlaceNotFoundException);
  });

  it("should not be able to update a place that does not exists ", () => {
    expect(async () => {
      await placesController.update("fake-id", { name: "john" });
    }).rejects.toBeInstanceOf(PlaceNotFoundException);
  });

  it("should not be able to delete a place  that does not exists ", () => {
    expect(async () => {
      await placesController.delete("fake-id");
    }).rejects.toBeInstanceOf(PlaceNotFoundException);
  });
});
