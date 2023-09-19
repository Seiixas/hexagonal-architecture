import { JwtProvider } from "app/providers/jwt/jwt.provider";
import { randomUUID } from "crypto";

export class JwtProviderInMemory implements JwtProvider {
  sign(payload: any): string {
    return randomUUID();
  }

  verify(token: string): boolean {
    return !!token;
  }
}
