import { UsersRepositoryInMemory } from "!modules/users/infra/repositories/users-in-memory.repository";
import { UsersRepository } from "!domain/users/users.repository";
import { CreateUserService } from "./create-user.service";
import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";

let createUserService: CreateUserService;
let usersRepository: UsersRepository;

describe("Create User Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
  });

  it("should be able to create a user", async () => {
    const user = await createUserService.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "my-secret-password",
    });

    expect(user).toBeDefined();
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
