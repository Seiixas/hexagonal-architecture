import { Module, Provider } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

import { UsersRepository } from "!domain/users/users.repository";
import { UsersRepositoryPrisma } from "!infra/database/prisma/repositories/user/users-prisma.repository";
import { CompaniesRepository } from "!domain/companies/companies.repository";
import { CompaniesRepositoryPrisma } from "!infra/database/prisma/repositories/company/companies-prisma.repository";
import { PlacesRepository } from "!domain/places/places.repository";
import { PlacesRepositoryPrisma } from "!infra/database/prisma/repositories/place/places-prisma.repository";
import { TypeOrmService } from "./typeorm.service";
import { UsersRepositoryTypeORM } from "!infra/database/typeorm/repositories/user/users-typeorm.repository";
import { UserTypeORMEntity } from "!infra/database/typeorm/entities/user.entity";
import { CompaniesRepositoryTypeORM } from "!infra/database/typeorm/repositories/company/companies-typeorm.repository";
import { CompanyTypeORMEntity } from "!infra/database/typeorm/entities/company.entity";
import { PlacesRepositoryTypeORM } from "!infra/database/typeorm/repositories/place/places-typeorm.repository";
import { PlaceTypeORMEntity } from "!infra/database/typeorm/entities/place.entity";
import { dataSource } from "!infra/database/typeorm/connection";

const prisma: Provider[] = [
  PrismaService,
  {
    provide: UsersRepository,
    useFactory: (prismaService: PrismaService) => {
      return new UsersRepositoryPrisma(prismaService);
    },
    inject: [PrismaService],
  },
  {
    provide: CompaniesRepository,
    useFactory: (prismaService: PrismaService) => {
      return new CompaniesRepositoryPrisma(prismaService);
    },
    inject: [PrismaService],
  },
  {
    provide: PlacesRepository,
    useFactory: (prismaService: PrismaService) => {
      return new PlacesRepositoryPrisma(prismaService);
    },
    inject: [PrismaService],
  },
];

const typeorm: Provider[] = [
  TypeOrmService,
  {
    provide: UsersRepository,
    useFactory: () => {
      return new UsersRepositoryTypeORM(
        dataSource.getRepository(UserTypeORMEntity)
      );
    },
    inject: [TypeOrmService],
  },
  {
    provide: CompaniesRepository,
    useFactory: () => {
      return new CompaniesRepositoryTypeORM(
        dataSource.getRepository(CompanyTypeORMEntity)
      );
    },
    inject: [TypeOrmService],
  },
  {
    provide: PlacesRepository,
    useFactory: () => {
      return new PlacesRepositoryTypeORM(
        dataSource.getRepository(PlaceTypeORMEntity)
      );
    },
    inject: [TypeOrmService],
  },
];

@Module({
  providers: prisma,
  exports: [UsersRepository, CompaniesRepository, PlacesRepository],
})
export class DatabaseModule {}
