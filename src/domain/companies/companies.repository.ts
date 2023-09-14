import { BaseRepository } from "!domain/base/base.repository";
import { Company } from "./company";
import { CreateCompanyDTO } from "./dtos/create-update.dto";

export interface CompaniesRepository
  extends BaseRepository<Company, CreateCompanyDTO> {}
