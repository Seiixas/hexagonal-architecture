import { dataSource } from "!infra/database/typeorm/connection";
import { DataSource, QueryFailedError } from "typeorm";
import { Test } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { ListUsersService } from "!modules/users/services/list-users/list-users.service";
import { CreateUserService } from "!modules/users/services/create-user/create-user.service";
import { UpdateUserService } from "!modules/users/services/update-user/update-user.service";
import { DeleteUserService } from "!modules/users/services/delete-user/delete-user.service";
import { ShowUserService } from "!modules/users/services/show-user/show-user.service";
import { UsersRepositoryTypeORM } from "!infra/database/typeorm/repositories/user/users-typeorm.repository";
import { UserTypeORMEntity } from "!infra/database/typeorm/entities/user.entity";
import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";
import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";

let connection: DataSource;
let usersController: UsersController;
let userId: string;

describe("Users Controller", () => {
  beforeAll(async () => {
    connection = await dataSource.initialize();
    await connection.runMigrations();

    const usersRepository = new UsersRepositoryTypeORM(
      connection.getRepository(UserTypeORMEntity)
    );

    const listUsersService = new ListUsersService(usersRepository);
    const createUserService = new CreateUserService(usersRepository);
    const updateUserService = new UpdateUserService(usersRepository);
    const deleteUserService = new DeleteUserService(usersRepository);
    const showUserService = new ShowUserService(usersRepository);

    const app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: CreateUserService,
          useValue: createUserService,
        },
        {
          provide: ListUsersService,
          useValue: listUsersService,
        },
        {
          provide: UpdateUserService,
          useValue: updateUserService,
        },
        {
          provide: ShowUserService,
          useValue: showUserService,
        },
        {
          provide: DeleteUserService,
          useValue: deleteUserService,
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await connection.dropDatabase();
  });

  it("should be able to create user", async () => {
    const user = await usersController.create({
      name: "John Doe",
      email: "john@doe.com",
      password: "my-password-test",
    });

    userId = user.id;

    expect(user).toBeDefined();
    expect(user).toHaveProperty("_id");
  });

  it("should be able to list all users", async () => {
    const users = await usersController.all();

    expect(users).toHaveLength(1);
  });

  it("should be able show an user profile", async () => {
    const user = await usersController.profile(userId);

    expect(user).toBeDefined();
  });

  it("should be able to update an user", async () => {
    await usersController.update(userId, {
      name: "Mary Doe",
    });

    const userUpdated = await usersController.profile(userId);

    expect(userUpdated).toBeDefined();
    expect(userUpdated).toHaveProperty("name");
    expect(userUpdated.name).toEqual("Mary Doe");
  });

  it("should be able delete an user profile", async () => {
    await usersController.delete(userId);

    const users = await usersController.all();

    expect(users).toHaveLength(0);
  });

  it("should not be able to show an user profile that does not exists ", () => {
    expect(async () => {
      await usersController.profile("fake-id");
    }).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it("should not be able to update an user that does not exists ", () => {
    expect(async () => {
      await usersController.update("fake-id", { name: "john" });
    }).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it("should not be able to delete an user  that does not exists ", () => {
    expect(async () => {
      await usersController.delete("fake-id");
    }).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it("should not be able to update a user with a email that are already in use", () => {
    expect(async () => {
      const user = await usersController.create({
        name: "John",
        email: "same@mail.com",
        password: "123",
      });

      await usersController.create({
        name: "John",
        email: "second@mail.com",
        password: "123",
      });

      await usersController.update(user.id, {
        email: "second@mail.com",
      });
    }).rejects.toBeInstanceOf(QueryFailedError);
  });
});
