import { DeletePlaceService } from "./delete-place.service";
import { CompaniesRepository } from "!domain/companies/companies.repository";
import { User } from "!domain/users/user";
import { PlacesRepository } from "!domain/places/places.repository";
import { PlacesRepositoryInMemory } from "!modules/companies/infra/repositories/places-in-memory.repository";
import { Company } from "!domain/companies/company";

let deletePlaceService: DeletePlaceService;
let placesRepository: PlacesRepository;

describe("Delete Place Use Case", () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory();
    deletePlaceService = new DeletePlaceService(placesRepository);
  });

  it("should be able to delete a place", async () => {
    const place = await placesRepository.store({
      name: "place",
      street: "street",
      state: "state",
      number: "15",
      district: "center",
      city: "city",
      cep: "cep",
      company: new Company({
        name: "MyCompany",
        website: "http://my.company.com",
        cnpj: "80.562.961/0001-29",
        user: new User({
          name: "John Doe",
          email: "john@doe.com",
          password: "my-secret-password",
        }),
      }),
    });

    await deletePlaceService.execute(place.id);

    const placeDeleted = await placesRepository.find({
      where: { id: place.id },
    });

    expect(placeDeleted).toBeNull();
  });

  it("should not be able to delete a place that does not exists", () => {
    expect(async () => {
      await deletePlaceService.execute("fake-place-id");
    });
  });
});
