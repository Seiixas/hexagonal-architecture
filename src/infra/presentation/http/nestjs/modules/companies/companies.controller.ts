import { CreateCompanyService } from "!modules/companies/services/create-company/create-company.service";
import { DeleteCompanyService } from "!modules/companies/services/delete-company/delete-company.service";
import { ListCompaniesService } from "!modules/companies/services/list-companies/list-companies.service";
import { ShowCompanyService } from "!modules/companies/services/show-company/show-company.service";
import { UpdateCompanyService } from "!modules/companies/services/update-company/update-company.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SerializeOptions,
} from "@nestjs/common";
import { StoreBodyDTO, UpdateBodyDTO } from "./dtos/controller.dto";

@Controller("companies")
export class CompaniesController {
  constructor(
    private readonly createCompanyService: CreateCompanyService,
    private readonly showCompanyService: ShowCompanyService,
    private readonly listCompaniesService: ListCompaniesService,
    private readonly deleteCompanyService: DeleteCompanyService,
    private readonly updateCompanyService: UpdateCompanyService
  ) {}

  @Post()
  async create(@Body() createCompanyDto: StoreBodyDTO) {
    return await this.createCompanyService.execute(createCompanyDto);
  }

  @Get()
  async all() {
    return await this.listCompaniesService.execute();
  }

  @Get("/:companyId")
  async profile(@Param("companyId") companyId: string) {
    return await this.showCompanyService.execute(companyId);
  }

  @Put("/:companyId")
  async update(
    @Param("companyId") companyId: string,
    @Body() updateCompanyDto: UpdateBodyDTO
  ) {
    return await this.updateCompanyService.execute({
      id: companyId,
      ...updateCompanyDto,
    });
  }

  @Delete("/:companyId")
  async delete(@Param("companyId") companyId: string) {
    return await this.deleteCompanyService.execute(companyId);
  }
}