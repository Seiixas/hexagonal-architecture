import { CompaniesRepositoryInMemory } from "!modules/companies/infra/repositories/companies-in-memory.repository";
import { CompaniesRepository } from "!domain/companies/companies.repository";
import { DeleteCompanyService } from "./delete-company.service";
import { User } from "!domain/users/user";
import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";
import { Company } from "!domain/companies/company";

let deleteCompanyService: DeleteCompanyService;
let companiesRepository: CompaniesRepository;

describe("Delete Company Use Case", () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    deleteCompanyService = new DeleteCompanyService(companiesRepository);
  });

  it("should be able to delete a company", async () => {
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

    await deleteCompanyService.execute(company.id);

    const companyDeleted = await companiesRepository.find({
      where: { id: company.id },
    });

    expect(companyDeleted).toBeNull();
  });

  it("should not be able to delete a company that does not exists", () => {
    expect(async () => {
      await deleteCompanyService.execute("fake-company-id");
    }).rejects.toBeInstanceOf(CompanyNotFoundException);
  });
});
