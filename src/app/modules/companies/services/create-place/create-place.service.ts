import { CompaniesRepository } from "!domain/companies/companies.repository";
import { Place } from "!domain/places/place";
import { PlacesRepository } from "!domain/places/places.repository";
import { CompanyNotFoundException } from "!modules/companies/errors/company-not-found.exception";

interface CreatePlaceUseCaseDTO {
  name: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  companyId: string;
}

export class CreatePlaceService {
  constructor(
    private readonly placesRepository: PlacesRepository,
    private readonly companiesRepository: CompaniesRepository
  ) {}

  async execute({
    name,
    cep,
    street,
    number,
    district,
    city,
    state,
    companyId,
  }: CreatePlaceUseCaseDTO): Promise<Place> {
    const company = await this.companiesRepository.find({
      where: { id: companyId },
    });

    if (!company) throw new CompanyNotFoundException();

    return await this.placesRepository.store({
      name,
      cep,
      street,
      number,
      district,
      city,
      state,
      company,
    });
  }
}
