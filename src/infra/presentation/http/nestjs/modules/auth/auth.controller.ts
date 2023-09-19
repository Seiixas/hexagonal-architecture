import { AuthenticateUserService } from "!modules/users/services/authenticate-user/authenticate-user.service";
import { Body, Controller, Post } from "@nestjs/common";
import { StoreBodyDTO } from "./dtos/controller.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService
  ) {}

  @Post("signin")
  async signIn(
    @Body() authenticateUserDto: StoreBodyDTO
  ): Promise<{ token: string }> {
    return {
      token: await this.authenticateUserService.execute(authenticateUserDto),
    };
  }
}
