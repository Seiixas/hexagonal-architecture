import { BaseRepository } from "!domain/base/base.repository";
import { Company } from "./company";

export abstract class CompaniesRepository extends BaseRepository<Company> {}
