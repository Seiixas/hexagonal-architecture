import { CompaniesRepository } from "!domain/companies/companies.repository";
import { ListCompaniesService } from "./list-companies.service";
import { CompaniesRepositoryInMemory } from "!modules/companies/infra/repositories/companies-in-memory.repository";
import { User } from "!domain/users/user";

let listCompaniesService: ListCompaniesService;
let companiesRepository: CompaniesRepository;

describe("List Companies Use Case", () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    listCompaniesService = new ListCompaniesService(companiesRepository);
  });

  it("should be able list companies", async () => {
    await companiesRepository.store({
      name: "MyCompany",
      website: "http://my.company.com",
      cnpj: "80.562.961/0001-29",
      user: new User({
        name: "John Doe",
        email: "john@doe.com",
        password: "my-secret-password",
      }),
    });

    const companiesList = await listCompaniesService.execute();

    expect(companiesList).toHaveLength(1);
  });
});
