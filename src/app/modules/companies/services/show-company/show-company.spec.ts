import { CompaniesRepository } from "!domain/companies/companies.repository";
import { ShowCompanyService } from "./show-company.service";
import { User } from "!domain/users/user";
import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";
import { Company } from "!domain/companies/company";
import { CompaniesRepositoryInMemory } from "!infra/database/in-memory/repositories/company/companies-in-memory.repository";

let listCompaniesService: ShowCompanyService;
let companiesRepository: CompaniesRepository;

describe("List Companies Use Case", () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    listCompaniesService = new ShowCompanyService(companiesRepository);
  });

  it("should be able show a  company", async () => {
    const company = await companiesRepository.store(
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

    const companyProfile = await listCompaniesService.execute(company.id);

    expect(companyProfile).toBeDefined();
    expect(companyProfile).toHaveProperty("id");
  });

  it("should not be able to show a company that does not exists", () => {
    expect(async () => {
      await listCompaniesService.execute("fake-company-id");
    }).rejects.toBeInstanceOf(CompanyNotFoundException);
  });
});
