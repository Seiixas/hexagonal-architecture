import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "../database/database.module";
import { CompaniesModule } from "./companies/companies.module";
import { PlacesModule } from "./places/places.module";
import { ProvidersModule } from "../providers/providers.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CompaniesModule,
    PlacesModule,
    DatabaseModule,
    ProvidersModule,
  ],
})
export class AppModule {}
