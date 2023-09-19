import { JwtService } from "@nestjs/jwt";
import { JwtProvider } from "app/providers/jwt/jwt.provider";

interface ConstructorProps {
  expiresIn: string;
  secret: string;
}

export class NestJwtProvider implements JwtProvider {
  private readonly jwtService: JwtService;

  constructor(props: ConstructorProps) {
    this.jwtService = new JwtService({
      secret: props.secret,
      signOptions: {
        expiresIn: props.expiresIn,
      },
    });
  }

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
