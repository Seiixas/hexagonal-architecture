export abstract class JwtProvider {
  abstract sign(payload: any): string;
  abstract verify(token: string): boolean;
}
