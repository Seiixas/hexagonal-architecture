import { UsersRepository } from "!domain/users/users.repository";
import { UsersRepositoryInMemory } from "!infra/database/in-memory/repositories/user/users-in-memory.repository";
import { HasherProviderInMemory } from "!infra/providers/hasher/in-memory-hasher.provider";
import { JwtProviderInMemory } from "!infra/providers/jwt/in-memory-jwt.provider";
import { HasherProvider } from "app/providers/hasher/hasher.provider";
import { JwtProvider } from "app/providers/jwt/jwt.provider";
import { AuthenticateUserService } from "./authenticate-user.service";
import { CreateUserService } from "../create-user/create-user.service";
import { User } from "!domain/users/user";
import { UnauthorizedUserException } from "!modules/users/errors/unauthorized-user.exception";

let usersRepository: UsersRepository;
let jwtProvider: JwtProvider;
let hasherProvider: HasherProvider;

let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

let user: User;

describe("Authenticate User Use Case", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory();
    hasherProvider = new HasherProviderInMemory();
    jwtProvider = new JwtProviderInMemory();

    createUserService = new CreateUserService(usersRepository, hasherProvider);

    user = await createUserService.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "my-secret-password",
    });

    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hasherProvider,
      jwtProvider
    );
  });

  it("should be able to authenticate an user", async () => {
    const token = await authenticateUserService.execute({
      email: user.email,
      password: "my-secret-password",
    });

    expect(token).toBeDefined();
  });

  it("should not be able to authenticate an user that does not exists", () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: "fake-user@mailcom",
        password: "my-fake-password",
      });
    }).rejects.toBeInstanceOf(UnauthorizedUserException);
  });

  it("should not be able to authenticate an user with wrong password", () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: user.email,
        password: "my-wrong-password",
      });
    }).rejects.toBeInstanceOf(UnauthorizedUserException);
  });

  it("should not be able to authenticate an user with wrong e-mail", () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: "my-wrong@mail.com",
        password: "my-secret-password",
      });
    }).rejects.toBeInstanceOf(UnauthorizedUserException);
  });
});
