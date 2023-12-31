import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Company } from "!domain/companies/company";
import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { User } from "!domain/users/user";
import { CompaniesRepositoryInMemory } from "!infra/database/in-memory/repositories/company/companies-in-memory.repository";
import { PlacesRepositoryInMemory } from "!infra/database/in-memory/repositories/company/places-in-memory.repository";
import { ListPlacesService } from "./list-places.service";

let companiesRepository: CompaniesRepository;
let listPlacesService: ListPlacesService;
let placesRepository: PlacesRepository;
let company: Company;

describe("List Places Use Case", () => {
  beforeEach(async () => {
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    listPlacesService = new ListPlacesService(placesRepository);

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

    await placesRepository.store(
      new Place({
        street: "street",
        state: "state",
        number: "123",
        name: "name",
        district: "district",
        company: null,
        city: "city",
        cep: "cep",
      })
    );

    await placesRepository.store(
      new Place({
        street: "street",
        state: "state",
        number: "123",
        name: "name",
        district: "district",
        company: await companiesRepository.store(
          new Company({
            name: "Second Company",
            website: "second.company.com",
            cnpj: "10.562.961/0001-29",
            user: new User({
              name: "Mary Doe",
              email: "mary@doe.com",
              password: "my-secret-password",
            }),
          })
        ),
        city: "city",
        cep: "cep",
      })
    );
  });

  it("should be able to list places", async () => {
    const places = await listPlacesService.execute();

    expect(places).toHaveLength(2);
  });
});
