import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";
import { PlacesRepository } from "!domain/places/places.repository";
import { User } from "!domain/users/user";
import { CompaniesRepositoryInMemory } from "!modules/companies/infra/repositories/companies-in-memory.repository";
import { PlacesRepositoryInMemory } from "!modules/companies/infra/repositories/places-in-memory.repository";
import { CreatePlaceService } from "./create-place.service";

let companiesRepository: CompaniesRepository;
let placesRepository: PlacesRepository;
let createPlaceService: CreatePlaceService;
let company: Company;

describe("Create Place Use Case", () => {
  beforeEach(async () => {
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();

    const companyCreated = await companiesRepository.store({
      name: "MyCompany",
      website: "http://my.company.com",
      cnpj: "80.562.961/0001-29",
      user: new User({
        name: "John Doe",
        email: "john@doe.com",
        password: "my-secret-password",
      }),
    });

    company = companyCreated;

    createPlaceService = new CreatePlaceService(
      placesRepository,
      companiesRepository
    );
  });

  it("should be able to create a place", async () => {
    const place = await createPlaceService.execute({
      name: "place",
      street: "street",
      state: "state",
      number: "15",
      district: "center",
      city: "city",
      cep: "cep",
      companyId: company.id,
    });

    expect(place).toBeDefined();
  });
});
