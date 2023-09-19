import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { CreateCompanyService } from "!modules/companies/services/create-company/create-company.service";
import { CompaniesRepository } from "!domain/companies/companies.repository";
import { UsersRepository } from "!domain/users/users.repository";
import { ListCompaniesService } from "!modules/companies/services/list-companies/list-companies.service";
import { UpdateCompanyService } from "!modules/companies/services/update-company/update-company.service";
import { ShowCompanyService } from "!modules/companies/services/show-company/show-company.service";
import { DeleteCompanyService } from "!modules/companies/services/delete-company/delete-company.service";
import { CompaniesController } from "./companies.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CompaniesController],
  providers: [
    {
      provide: CreateCompanyService,
      useFactory: (
        companiesRepository: CompaniesRepository,
        usersRepository: UsersRepository
      ) => {
        return new CreateCompanyService(companiesRepository, usersRepository);
      },
      inject: [CompaniesRepository, UsersRepository],
    },
    {
      provide: ListCompaniesService,
      useFactory: (companiesRepository: CompaniesRepository) => {
        return new ListCompaniesService(companiesRepository);
      },
      inject: [CompaniesRepository],
    },
    {
      provide: UpdateCompanyService,
      useFactory: (companiesRepository: CompaniesRepository) => {
        return new UpdateCompanyService(companiesRepository);
      },
      inject: [CompaniesRepository],
    },
    {
      provide: ShowCompanyService,
      useFactory: (companiesRepository: CompaniesRepository) => {
        return new ShowCompanyService(companiesRepository);
      },
      inject: [CompaniesRepository],
    },
    {
      provide: DeleteCompanyService,
      useFactory: (companiesRepository: CompaniesRepository) => {
        return new DeleteCompanyService(companiesRepository);
      },
      inject: [CompaniesRepository],
    },
  ],
})
export class CompaniesModule {}
