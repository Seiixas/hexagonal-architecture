import { Company } from "!domain/companies/company";
import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { User } from "!domain/users/user";
import { PlacesRepositoryInMemory } from "!infra/database/in-memory/repositories/company/places-in-memory.repository";
import { PlaceNotFoundException } from "!modules/companies/errors/place-not-found.exception";
import { ShowPlaceService } from "./show-place.service";

let placesRepository: PlacesRepository;
let showPlaceService: ShowPlaceService;

describe("Show Place Use Case", () => {
  beforeEach(async () => {
    placesRepository = new PlacesRepositoryInMemory();
    showPlaceService = new ShowPlaceService(placesRepository);
  });

  it("should be able to show a place", async () => {
    const place = await placesRepository.store(
      new Place({
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
      })
    );

    const placeProfile = await showPlaceService.execute(place.id);

    expect(placeProfile).toBeDefined();
    expect(placeProfile.id).toEqual(place.id);
  });

  it("should not be able to show a place that does not exists", () => {
    expect(async () => {
      await showPlaceService.execute("fake-place-id");
    }).rejects.toBeInstanceOf(PlaceNotFoundException);
  });
});
