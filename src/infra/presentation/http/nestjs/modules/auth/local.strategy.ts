import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UnauthorizedUserException } from "!modules/users/errors/unauthorized-user.exception";

import { Strategy } from "passport-local";
import { AuthenticateUserService } from "!modules/users/services/authenticate-user/authenticate-user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService
  ) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string) {
    const user = await this.authenticateUserService.execute({
      email,
      password,
    });
    if (!user) {
      throw new UnauthorizedUserException();
    }
    return user;
  }
}
