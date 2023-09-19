import { Place as PlaceLocal } from "!domain/places/place";
import { Place as PlacePrisma, Company as CompanyPrisma } from "@prisma/client";
import { CompanyMapper } from "../company/company.mapper";

interface PlacePrismaInterface extends PlacePrisma {
  company?: CompanyPrisma;
}

export class PlaceMapper {
  public static toPrisma(place: PlaceLocal | Partial<PlaceLocal>): PlacePrisma {
    return {
      id: place.id,
      name: place.name,
      state: place.state,
      street: place.street,
      number: place.number,
      district: place.district,
      companyId: place.company.id,
      city: place.city,
      cep: place.cep,
      updated_at: place.updatedAt,
      created_at: place.createdAt,
    };
  }

  public static toLocal(place: PlacePrismaInterface): PlaceLocal {
    return new PlaceLocal({
      id: place.id,
      name: place.name,
      state: place.state,
      street: place.street,
      number: place.number,
      district: place.district,
      company: place.company ? CompanyMapper.toLocal(place.company) : null,
      city: place.city,
      cep: place.cep,
      updatedAt: place.updated_at,
      createdAt: place.created_at,
    });
  }
}
