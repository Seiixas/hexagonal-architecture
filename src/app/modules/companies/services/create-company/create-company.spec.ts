import { UsersRepositoryInMemory } from "!modules/users/infra/repositories/users-in-memory.repository";
import { CompaniesRepositoryInMemory } from "!modules/companies/infra/repositories/companies-in-memory.repository";

import { UsersRepository } from "!domain/users/users.repository";
import { CompaniesRepository } from "!domain/companies/companies.repository";

import { CreateCompanyService } from "./create-company.service";
import { CreateUserService } from "!modules/users/services/create-user/create-user.service";
import { CNPJUnavailableException } from "!modules/companies/errors/cnpj-unavailable.exception";
import { InvalidFieldFormatException } from "!modules/companies/errors/invalid-field-format.exception";

let createCompanyService: CreateCompanyService;
let createUserService: CreateUserService;
let usersRepository: UsersRepository;
let companiesRepository: CompaniesRepository;
let userId: string;

describe("Create Company Use Case", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    createCompanyService = new CreateCompanyService(
      companiesRepository,
      usersRepository
    );
    createUserService = new CreateUserService(usersRepository);

    const userCreated = await createUserService.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "my-secret-password",
    });

    userId = userCreated.id;
  });

  it("should be able to create a company", async () => {
    const company = await createCompanyService.execute({
      name: "MyCompany",
      website: "http://my.company.com",
      cnpj: "80.562.961/0001-29",
      userId,
    });

    expect(company).toBeDefined();
  });

  it("should not be able to create a company with invalid CNPJ", () => {
    expect(async () => {
      await createCompanyService.execute({
        name: "MyCompany",
        website: "fake-web-site",
        cnpj: "80.562.961/0001-29",
        userId,
      });
    }).rejects.toBeInstanceOf(InvalidFieldFormatException);
  });

  it("should not be able to create a company with invalid website", () => {
    expect(async () => {
      await createCompanyService.execute({
        name: "MyCompany",
        website: "http://my.company.com",
        cnpj: "111.111.111-11",
        userId,
      });
    }).rejects.toBeInstanceOf(InvalidFieldFormatException);
  });

  it("should not be able to create a user with CNPJ in use", () => {
    expect(async () => {
      await createCompanyService.execute({
        name: "MyCompany",
        website: "http://my.company.com",
        cnpj: "80.562.961/0001-29",
        userId,
      });
      await createCompanyService.execute({
        name: "MySecondCompany",
        website: "http://my.second.company.com",
        cnpj: "80.562.961/0001-29",
        userId,
      });
    }).rejects.toBeInstanceOf(CNPJUnavailableException);
  });
});
