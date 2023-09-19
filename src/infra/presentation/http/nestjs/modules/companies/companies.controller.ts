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
  UseGuards,
} from "@nestjs/common";
import { StoreCompanyDTO, UpdateCompanyDTO } from "./dtos/controller.dto";
import { CompanyToView, CompanyView } from "./view/company.view";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  COMPANY_NOT_FOUND_EXCEPTION,
  INVALID_CNPJ_FORMAT_EXCEPTION,
  INVALID_WEBSITE_FORMAT_EXCEPTION,
  UNAUTHORIZED_USER_EXCEPTION,
  USER_NOT_FOUND_EXCEPTION,
} from "../../swagger/errors";

@UseGuards(JwtAuthGuard)
@ApiTags("companies")
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
  @ApiCreatedResponse({
    description: "Company created",
  })
  @ApiBadRequestResponse({
    description: "Body fields incorrect",
  })
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiResponse({
    status: USER_NOT_FOUND_EXCEPTION.statusCode,
    description: USER_NOT_FOUND_EXCEPTION.message,
  })
  @ApiResponse({
    status: INVALID_CNPJ_FORMAT_EXCEPTION.statusCode,
    description: INVALID_CNPJ_FORMAT_EXCEPTION.message,
  })
  @ApiResponse({
    status: INVALID_WEBSITE_FORMAT_EXCEPTION.statusCode,
    description: INVALID_WEBSITE_FORMAT_EXCEPTION.message,
  })
  async create(
    @Body() createCompanyDto: StoreCompanyDTO
  ): Promise<CompanyToView> {
    return CompanyView.ToView(
      await this.createCompanyService.execute(createCompanyDto)
    );
  }

  @Get()
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  async all(): Promise<CompanyToView[]> {
    const companies = await this.listCompaniesService.execute();
    return companies.map((company) => CompanyView.ToView(company));
  }

  @Get("/:companyId")
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiResponse({
    status: COMPANY_NOT_FOUND_EXCEPTION.statusCode,
    description: COMPANY_NOT_FOUND_EXCEPTION.message,
  })
  async profile(@Param("companyId") companyId: string): Promise<CompanyToView> {
    return CompanyView.ToView(await this.showCompanyService.execute(companyId));
  }

  @Put("/:companyId")
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiResponse({
    status: COMPANY_NOT_FOUND_EXCEPTION.statusCode,
    description: COMPANY_NOT_FOUND_EXCEPTION.message,
  })
  @ApiBadRequestResponse({
    description: "Body fields incorrect",
  })
  async update(
    @Param("companyId") companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDTO
  ) {
    return await this.updateCompanyService.execute({
      id: companyId,
      ...updateCompanyDto,
    });
  }

  @Delete("/:companyId")
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiResponse({
    status: COMPANY_NOT_FOUND_EXCEPTION.statusCode,
    description: COMPANY_NOT_FOUND_EXCEPTION.message,
  })
  async delete(@Param("companyId") companyId: string) {
    return await this.deleteCompanyService.execute(companyId);
  }
}
