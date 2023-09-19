import { CreateUserService } from "!modules/users/services/create-user/create-user.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { StoreBodyDTO, UpdateBodyDTO } from "./dtos/controller.dto";
import { ListUsersService } from "!modules/users/services/list-users/list-users.service";
import { DeleteUserService } from "!modules/users/services/delete-user/delete-user.service";
import { ShowUserService } from "!modules/users/services/show-user/show-user.service";
import { UpdateUserService } from "!modules/users/services/update-user/update-user.service";

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
  async create(@Body() createUserDto: StoreBodyDTO) {
    return await this.createUserService.execute(createUserDto);
  }

  @Get()
  async all() {
    return await this.listUsersService.execute();
  }

  @Get("/:userId")
  async profile(@Param("userId") userId: string) {
    return await this.showUserService.execute(userId);
  }

  @Delete("/:userId")
  async delete(@Param("userId") userId: string) {
    return await this.deleteUserService.execute(userId);
  }

  @Put("/:userId")
  async update(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateBodyDTO
  ) {
    return await this.updateUserService.execute({
      id: userId,
      ...updateUserDto,
    });
  }
}
