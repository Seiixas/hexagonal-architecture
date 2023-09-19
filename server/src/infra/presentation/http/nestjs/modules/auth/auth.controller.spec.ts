import { dataSource } from "!infra/database/typeorm/connection";
import { DataSource } from "typeorm";
import { Test } from "@nestjs/testing";

import { UserTypeORMEntity } from "!infra/database/typeorm/entities/user.entity";
import { UsersRepositoryTypeORM } from "!infra/database/typeorm/repositories/user/users-typeorm.repository";
import { User } from "!domain/users/user";
import { AuthController } from "./auth.controller";
import { AuthenticateUserService } from "!modules/users/services/authenticate-user/authenticate-user.service";
import { JwtProviderInMemory } from "!infra/providers/jwt/in-memory-jwt.provider";
import { HasherProviderInMemory } from "!infra/providers/hasher/in-memory-hasher.provider";
import { UnauthorizedUserException } from "!modules/users/errors/unauthorized-user.exception";

let connection: DataSource;
let authController: AuthController;
let user: User;

describe("Auth Controller", () => {
  beforeAll(async () => {
    connection = await dataSource.initialize();
    await connection.runMigrations();

    const usersRepository = new UsersRepositoryTypeORM(
      connection.getRepository(UserTypeORMEntity)
    );

    const jwtProviderInMemory = new JwtProviderInMemory();
    const hasherProviderInMemory = new HasherProviderInMemory();

    user = await usersRepository.store(
      new User({
        name: "John Doe",
        email: "mateus@dev.com",
        password: await hasherProviderInMemory.hash("my-secret-password"),
      })
    );

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hasherProviderInMemory,
      jwtProviderInMemory
    );

    const app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthenticateUserService,
          useValue: authenticateUserService,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    await connection.dropDatabase();
  });

  it("should be able to authenticate an user", async () => {
    const response = await authController.signIn({
      email: user.email,
      password: "my-secret-password",
    });

    expect(response).toBeDefined();
  });

  it("should not be able to authenticate an user that does not exists", () => {
    expect(async () => {
      await authController.signIn({
        email: "fake@mail.com",
        password: "my-fake-password",
      });
    }).rejects.toBeInstanceOf(UnauthorizedUserException);
  });

  it("should not be able to authenticate an user with wrong e-mail", () => {
    expect(async () => {
      await authController.signIn({
        email: "fake@mail.com",
        password: "my-secret-password",
      });
    }).rejects.toBeInstanceOf(UnauthorizedUserException);
  });

  it("should not be able to authenticate an user with wrong password", () => {
    expect(async () => {
      await authController.signIn({
        email: user.email,
        password: "my-fake-password",
      });
    }).rejects.toBeInstanceOf(UnauthorizedUserException);
  });
});
