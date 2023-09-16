import { CompaniesRepository } from "!domain/companies/companies.repository";
import { ListCompaniesService } from "./list-companies.service";
import { User } from "!domain/users/user";
import { Company } from "!domain/companies/company";
import { CompaniesRepositoryInMemory } from "!infra/database/in-memory/repositories/company/companies-in-memory.repository";

let listCompaniesService: ListCompaniesService;
let companiesRepository: CompaniesRepository;

describe("List Companies Use Case", () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    listCompaniesService = new ListCompaniesService(companiesRepository);
  });

  it("should be able list companies", async () => {
    await companiesRepository.store(
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

    const companiesList = await listCompaniesService.execute();

    expect(companiesList).toHaveLength(1);
  });
});
