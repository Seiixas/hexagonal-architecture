import { UpdateCompanyService } from "./update-company.service";
import { CompaniesRepository } from "!domain/companies/companies.repository";
import { User } from "!domain/users/user";
import { InvalidFieldFormatException } from "!modules/companies/errors/invalid-field-format.exception";
import { CNPJUnavailableException } from "!modules/companies/errors/cnpj-unavailable.exception";
import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";
import { Company } from "!domain/companies/company";
import { CompaniesRepositoryInMemory } from "!infra/database/in-memory/repositories/company/companies-in-memory.repository";

let updateCompanyService: UpdateCompanyService;
let companiesRepository: CompaniesRepository;

describe("Update Company Use Case", () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    updateCompanyService = new UpdateCompanyService(companiesRepository);
  });

  it("should be able to update a company", async () => {
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

    await updateCompanyService.execute({
      id: company.id,
      website: "https://other.website.com",
    });

    const companyUpdated = await companiesRepository.find({
      where: { id: company.id },
    });

    expect(companyUpdated.id).toEqual(company.id);
    expect(companyUpdated.website).toEqual("https://other.website.com");
  });

  it("should not be able to update a company with invalid CNPJ", () => {
    expect(async () => {
      const company = await companiesRepository.store(
        new Company({
          name: "MyCompany",
          website: "http://my.company.com",
          cnpj: "80562961000129",
          user: new User({
            name: "John Doe",
            email: "john@doe.com",
            password: "my-secret-password",
          }),
        })
      );

      await updateCompanyService.execute({
        id: company.id,
        cnpj: "111.111.111-11",
      });
    }).rejects.toBeInstanceOf(InvalidFieldFormatException);
  });

  it("should not be able to create a company with invalid website", () => {
    expect(async () => {
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

      await updateCompanyService.execute({
        id: company.id,
        website: "fake-website",
      });
    }).rejects.toBeInstanceOf(InvalidFieldFormatException);
  });

  it("should not be able to update a company with an used CNPJ", async () => {
    try {
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

      await companiesRepository.store(
        new Company({
          name: "OtherCompany",
          website: "http://other.company.com",
          cnpj: "70.562.961/0001-29",
          user: new User({
            name: "Mary Doe",
            email: "mary@doe.com",
            password: "my-secret-password",
          }),
        })
      );

      await updateCompanyService.execute({
        id: company.id,
        cnpj: "70.562.961/0001-29",
      });
      fail("Expected CNPJUnavailableException to be thrown.");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it("should not be able to update a company that does not exists", () => {
    expect(async () => {
      await updateCompanyService.execute({
        id: "fake-company-id",
      });
    }).rejects.toBeInstanceOf(CompanyNotFoundException);
  });
});
