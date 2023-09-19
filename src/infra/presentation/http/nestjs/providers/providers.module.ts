import { HasherProvider } from "!infra/providers/hasher/hasher.provider";
import { HasherProviderBcrypt } from "!infra/providers/hasher/implementations/bcrypt-hasher.provider";
import { HasherProviderInMemory } from "!infra/providers/hasher/implementations/in-memory-hasher.provider";
import { Module, Provider } from "@nestjs/common";

const providers: Provider[] = [
  {
    provide: HasherProvider,
    useFactory: () => {
      return new HasherProviderBcrypt();
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
  exports: [HasherProvider],
})
export class ProvidersModule {}
