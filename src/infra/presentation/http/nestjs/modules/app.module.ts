import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "../database/database.module";
import { CompaniesModule } from "./companies/companies.module";
import { PlacesModule } from "./places/places.module";

@Module({
  imports: [UsersModule, CompaniesModule, PlacesModule, DatabaseModule],
})
export class AppModule {}
