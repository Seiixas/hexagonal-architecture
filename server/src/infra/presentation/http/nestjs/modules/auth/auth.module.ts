import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { ProvidersModule } from "../../providers/providers.module";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { AuthenticateUserService } from "!modules/users/services/authenticate-user/authenticate-user.service";
import { UsersRepository } from "!domain/users/users.repository";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "../../database/database.module";
import { HasherProvider } from "app/providers/hasher/hasher.provider";
import { JwtProvider } from "app/providers/jwt/jwt.provider";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UsersModule,
    DatabaseModule,
    ProvidersModule,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: AuthenticateUserService,
      useFactory: (
        usersRepository: UsersRepository,
        hasherProvider: HasherProvider,
        jwtProvider: JwtProvider
      ) => {
        return new AuthenticateUserService(
          usersRepository,
          hasherProvider,
          jwtProvider
        );
      },
      inject: [UsersRepository, HasherProvider, JwtProvider],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
