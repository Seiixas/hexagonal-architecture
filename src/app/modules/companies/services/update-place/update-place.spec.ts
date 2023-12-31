import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";
import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { User } from "!domain/users/user";
import { CompaniesRepositoryInMemory } from "!infra/database/in-memory/repositories/company/companies-in-memory.repository";
import { PlacesRepositoryInMemory } from "!infra/database/in-memory/repositories/company/places-in-memory.repository";
import { UpdatePlaceService } from "./update-place.service";

let updatePlaceService: UpdatePlaceService;
let placesRepository: PlacesRepository;
let companiesRepository: CompaniesRepository;
let company: Company;

describe("Update Place Use Case", () => {
  beforeEach(async () => {
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    updatePlaceService = new UpdatePlaceService(placesRepository);
    company = await companiesRepository.store(
      new Company({
        name: "MyCompany",
        website: "http://my.company.com",
        cnpj: "80.562.961/0001-29",
        user: new User({
          name: "John Doe",
          email: "john@doe.com",
          password: "my-secret-password",
        }),
      })
    );
  });

  it("should be able to update a place", async () => {
    const place = await placesRepository.store(
      new Place({
        name: "place",
        street: "street",
        state: "state",
        number: "15",
        district: "center",
        city: "city",
        cep: "cep",
        company,
      })
    );

    await updatePlaceService.execute({
      id: place.id,
      street: "new-street",
    });

    expect(
      (await placesRepository.find({ where: { id: place.id } })).street
    ).toEqual("new-street");
  });
});
