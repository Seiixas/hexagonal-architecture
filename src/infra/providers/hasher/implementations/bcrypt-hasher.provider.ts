import { hash } from "bcrypt";

import { HasherProvider } from "../hasher.provider";

export class HasherProviderBcrypt implements HasherProvider {
  async hash(value: string): Promise<string> {
    const hashedValue = await hash(value, 8);
    return hashedValue;
  }
}
