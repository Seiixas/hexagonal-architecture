import { UsersRepository } from "!domain/users/users.repository";
import { CreateUserService } from "./create-user.service";
import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";
import { UsersRepositoryInMemory } from "!infra/database/in-memory/repositories/user/users-in-memory.repository";
import { HasherProviderInMemory } from "!infra/providers/hasher/in-memory-hasher.provider";
import { HasherProvider } from "app/providers/hasher/hasher.provider";

let createUserService: CreateUserService;
let usersRepository: UsersRepository;
let hasherProvider: HasherProvider;

describe("Create User Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    hasherProvider = new HasherProviderInMemory();
    createUserService = new CreateUserService(usersRepository, hasherProvider);
  });

  it("should be able to create a user", async () => {
    const user = await createUserService.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "my-secret-password",
    });

    expect(user).toBeDefined();
    expect(user.password).not.toEqual("my-secret-password");
  });

  it("should not be able to create a user with e-mail in use", () => {
    expect(async () => {
      await createUserService.execute({
        name: "John Doe",
        email: "john@doe.com",
        password: "my-secret-password",
      });
      await createUserService.execute({
        name: "Mary Doe",
        email: "john@doe.com",
        password: "my-secret-password-2",
      });
    }).rejects.toBeInstanceOf(EmailUnavailableException);
  });
});
