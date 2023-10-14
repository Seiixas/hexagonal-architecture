import { AuthenticateUserService } from "!modules/users/services/authenticate-user/authenticate-user.service";
import { Body, Controller, Post } from "@nestjs/common";
import { StoreAuthDTO } from "./dtos/controller.dto";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UNAUTHORIZED_USER_EXCEPTION } from "../../swagger/errors";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService
  ) {}

  @Post("signin")
  @ApiOkResponse({
    description: "User authenticated",
  })
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  async signIn(
    @Body() authenticateUserDto: StoreAuthDTO
  ): Promise<{ token: string }> {
    return {
      token: await this.authenticateUserService.execute(authenticateUserDto),
    };
  }
}
