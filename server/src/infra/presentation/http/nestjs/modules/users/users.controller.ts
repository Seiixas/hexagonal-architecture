import { CreateUserService } from "!modules/users/services/create-user/create-user.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { StoreUserDTO, UpdateUserDTO } from "./dtos/controller.dto";
import { ListUsersService } from "!modules/users/services/list-users/list-users.service";
import { DeleteUserService } from "!modules/users/services/delete-user/delete-user.service";
import { ShowUserService } from "!modules/users/services/show-user/show-user.service";
import { UpdateUserService } from "!modules/users/services/update-user/update-user.service";
import { UserToView, UserView } from "./view/user.view";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  EMAIL_UNAVAILABLE_EXCEPTION,
  UNAUTHORIZED_USER_EXCEPTION,
  USER_NOT_FOUND_EXCEPTION,
} from "../../swagger/errors";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: ListUsersService,
    private readonly deleteUserService: DeleteUserService,
    private readonly showUserService: ShowUserService,
    private readonly updateUserService: UpdateUserService
  ) {}

  @Post()
  @ApiResponse({
    status: EMAIL_UNAVAILABLE_EXCEPTION.statusCode,
    description: EMAIL_UNAVAILABLE_EXCEPTION.message,
  })
  @ApiCreatedResponse({
    description: "User created",
  })
  @ApiBadRequestResponse({
    description: "Body fields incorrect",
  })
  async create(@Body() createUserDto: StoreUserDTO): Promise<UserToView> {
    return UserView.ToView(await this.createUserService.execute(createUserDto));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  async all(): Promise<UserToView[]> {
    const users = await this.listUsersService.execute();
    return users.map((user) => UserView.ToView(user));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:userId")
  @ApiResponse({
    status: USER_NOT_FOUND_EXCEPTION.statusCode,
    description: USER_NOT_FOUND_EXCEPTION.message,
  })
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  async profile(@Param("userId") userId: string): Promise<UserToView> {
    return UserView.ToView(await this.showUserService.execute(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:userId")
  @ApiResponse({
    status: USER_NOT_FOUND_EXCEPTION.statusCode,
    description: USER_NOT_FOUND_EXCEPTION.message,
  })
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  async delete(@Param("userId") userId: string): Promise<void> {
    return await this.deleteUserService.execute(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put("/:userId")
  @ApiResponse({
    status: USER_NOT_FOUND_EXCEPTION.statusCode,
    description: USER_NOT_FOUND_EXCEPTION.message,
  })
  @ApiResponse({
    status: EMAIL_UNAVAILABLE_EXCEPTION.statusCode,
    description: EMAIL_UNAVAILABLE_EXCEPTION.message,
  })
  @ApiResponse({
    status: UNAUTHORIZED_USER_EXCEPTION.statusCode,
    description: UNAUTHORIZED_USER_EXCEPTION.message,
  })
  @ApiBadRequestResponse({
    description: "Body fields incorrect",
  })
  async update(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDTO
  ): Promise<void> {
    return await this.updateUserService.execute({
      id: userId,
      ...updateUserDto,
    });
  }
}
