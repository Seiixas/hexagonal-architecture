import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { DatabaseModule } from "../../database/database.module";
import { CreateUserService } from "!modules/users/services/create-user/create-user.service";
import { UsersRepository } from "!domain/users/users.repository";
import { ListUsersService } from "!modules/users/services/list-users/list-users.service";
import { UpdateUserService } from "!modules/users/services/update-user/update-user.service";
import { ShowUserService } from "!modules/users/services/show-user/show-user.service";
import { DeleteUserService } from "!modules/users/services/delete-user/delete-user.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: CreateUserService,
      useFactory: (usersRepository: UsersRepository) => {
        return new CreateUserService(usersRepository);
      },
      inject: [UsersRepository],
    },
    {
      provide: ListUsersService,
      useFactory: (usersRepository: UsersRepository) => {
        return new ListUsersService(usersRepository);
      },
      inject: [UsersRepository],
    },
    {
      provide: UpdateUserService,
      useFactory: (usersRepository: UsersRepository) => {
        return new UpdateUserService(usersRepository);
      },
      inject: [UsersRepository],
    },
    {
      provide: ShowUserService,
      useFactory: (usersRepository: UsersRepository) => {
        return new ShowUserService(usersRepository);
      },
      inject: [UsersRepository],
    },
    {
      provide: DeleteUserService,
      useFactory: (usersRepository: UsersRepository) => {
        return new DeleteUserService(usersRepository);
      },
      inject: [UsersRepository],
    },
  ],
})
export class UsersModule {}
