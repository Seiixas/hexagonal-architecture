import { HasherProviderBcrypt } from "!infra/providers/hasher/bcrypt-hasher.provider";
import { HasherProviderInMemory } from "!infra/providers/hasher/in-memory-hasher.provider";
import { NestJwtProvider } from "!infra/providers/jwt/nestjwt.provider";
import { Module, Provider } from "@nestjs/common";
import { HasherProvider } from "app/providers/hasher/hasher.provider";
import { JwtProvider } from "app/providers/jwt/jwt.provider";

const providers: Provider[] = [
  {
    provide: HasherProvider,
    useFactory: () => {
      return new HasherProviderBcrypt();
    },
  },
  {
    provide: JwtProvider,
    useFactory: () => {
      return new NestJwtProvider({
        expiresIn: "1d",
        secret: "my-secret",
      });
    },
  },
];

const providersMocked: Provider[] = [
  {
    provide: HasherProvider,
    useFactory: () => {
      return new HasherProviderInMemory();
    },
  },
];

@Module({
  providers,
  exports: [HasherProvider, JwtProvider],
})
export class ProvidersModule {}
