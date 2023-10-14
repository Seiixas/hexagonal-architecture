import { HasherProvider } from "app/providers/hasher/hasher.provider";
import { compare as useCompare, hash } from "bcrypt";

export class HasherProviderBcrypt implements HasherProvider {
  async hash(value: string): Promise<string> {
    const hashedValue = await hash(value, 8);
    return hashedValue;
  }

  async compare(value: string, _value: string): Promise<boolean> {
    return await useCompare(value, _value);
  }
}
