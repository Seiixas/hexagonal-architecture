import { dataSource } from "!infra/database/typeorm/connection";
import { DataSource, QueryFailedError } from "typeorm";
import { Test } from "@nestjs/testing";
import { CompaniesController } from "./companies.controller";
import { ListCompaniesService } from "!modules/companies/services/list-companies/list-companies.service";
import { CreateCompanyService } from "!modules/companies/services/create-company/create-company.service";
import { UpdateCompanyService } from "!modules/companies/services/update-company/update-company.service";
import { DeleteCompanyService } from "!modules/companies/services/delete-company/delete-company.service";
import { ShowCompanyService } from "!modules/companies/services/show-company/show-company.service";
import { CompaniesRepositoryTypeORM } from "!infra/database/typeorm/repositories/company/companies-typeorm.repository";
import { CompanyTypeORMEntity } from "!infra/database/typeorm/entities/company.entity";
import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";
import { UserTypeORMEntity } from "!infra/database/typeorm/entities/user.entity";
import { UsersRepositoryTypeORM } from "!infra/database/typeorm/repositories/user/users-typeorm.repository";
import { User } from "!domain/users/user";
import { AppError } from "!shared/errors/app.error";

let connection: DataSource;
let companiesController: CompaniesController;
let userId: string;

describe("Companies Controller", () => {
  beforeAll(async () => {
    connection = await dataSource.initialize();
    await connection.runMigrations();

    const companiesRepository = new CompaniesRepositoryTypeORM(
      connection.getRepository(CompanyTypeORMEntity)
    );
    const usersRepository = new UsersRepositoryTypeORM(
      connection.getRepository(UserTypeORMEntity)
    );

    const listCompaniesService = new ListCompaniesService(companiesRepository);
    const createCompanyService = new CreateCompanyService(
      companiesRepository,
      usersRepository
    );
    const updateCompanyService = new UpdateCompanyService(companiesRepository);
    const deleteCompanyService = new DeleteCompanyService(companiesRepository);
    const showCompanyService = new ShowCompanyService(companiesRepository);

    const user = await usersRepository.store(
      new User({
        name: "John Doe",
        email: "mateus@dev.com",
        password: "my-password-secret",
      })
    );

    userId = user.id;

    const app = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CreateCompanyService,
          useValue: createCompanyService,
        },
        {
          provide: ListCompaniesService,
          useValue: listCompaniesService,
        },
        {
          provide: UpdateCompanyService,
          useValue: updateCompanyService,
        },
        {
          provide: ShowCompanyService,
          useValue: showCompanyService,
        },
        {
          provide: DeleteCompanyService,
          useValue: deleteCompanyService,
        },
      ],
    }).compile();

    companiesController = app.get<CompaniesController>(CompaniesController);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
    await connection.destroy();
  });

  it("should be able to create company", async () => {
    const company = await companiesController.create({
      name: "My Company",
      website: "http://my.company.com",
      cnpj: "40.956.311/0001-41",
      userId,
    });

    userId = company.id;

    expect(company).toBeDefined();
    expect(company).toHaveProperty("_id");
  });

  it("should be able to list all companies", async () => {
    const companies = await companiesController.all();

    expect(companies).toHaveLength(1);
  });

  it("should be able show a company profile", async () => {
    const company = await companiesController.profile(userId);

    expect(company).toBeDefined();
  });

  it("should be able to update a company", async () => {
    await companiesController.update(userId, {
      name: "Mary Doe",
    });

    const userUpdated = await companiesController.profile(userId);

    expect(userUpdated).toBeDefined();
    expect(userUpdated).toHaveProperty("name");
    expect(userUpdated.name).toEqual("Mary Doe");
  });

  it("should be able delete a company profile", async () => {
    await companiesController.delete(userId);

    const companies = await companiesController.all();

    expect(companies).toHaveLength(0);
  });

  it("should not be able to show a company profile that does not exists ", () => {
    expect(async () => {
      await companiesController.profile("fake-id");
    }).rejects.toBeInstanceOf(CompanyNotFoundException);
  });

  it("should not be able to update a company that does not exists ", () => {
    expect(async () => {
      await companiesController.update("fake-id", { name: "john" });
    }).rejects.toBeInstanceOf(CompanyNotFoundException);
  });

  it("should not be able to update a company with a CNPJ that are already in use", () => {
    expect(async () => {
      const company = await companiesController.create({
        name: "John",
        cnpj: "40.956.311/0001-40",
        website: "http://my.first.website",
        userId,
      });

      console.log(company);

      await companiesController.create({
        name: "John",
        cnpj: "40.956.311/0001-41",
        website: "http://my.second.website",
        userId,
      });

      await companiesController.update(company.id, {
        cnpj: "40.956.311/0001-40",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a company with a website that are already in use", () => {
    expect(async () => {
      const company = await companiesController.create({
        name: "John",
        cnpj: "40.956.311/0001-40",
        website: "http://my.first.website",
        userId,
      });

      await companiesController.create({
        name: "John",
        cnpj: "40.956.311/0001-41",
        website: "http://my.second.website",
        userId,
      });

      await companiesController.update(company.id, {
        website: "http://my.second.website",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete a company  that does not exists ", () => {
    expect(async () => {
      await companiesController.delete("fake-id");
    }).rejects.toBeInstanceOf(CompanyNotFoundException);
  });
});
