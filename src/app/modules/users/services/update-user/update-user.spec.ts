import { UsersRepository } from "!domain/users/users.repository";
import { UpdateUserService } from "./update-user.service";
import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";
import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";
import { User } from "!domain/users/user";
import { UsersRepositoryInMemory } from "!infra/database/in-memory/repositories/user/users-in-memory.repository";

let updateUserService: UpdateUserService;
let usersRepository: UsersRepository;

describe("Update User Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    updateUserService = new UpdateUserService(usersRepository);
  });

  it("should be able to update an user", async () => {
    const user = await usersRepository.store(
      new User({
        name: "John Doe",
        email: "john@doe.com",
        password: "my-secret-password",
      })
    );

    await updateUserService.execute({ id: user.id, name: "Mary Doe" });

    const userUpdated = await usersRepository.find({
      where: { id: user.id },
    });

    expect(userUpdated.id).toEqual(user.id);
    expect(userUpdated.name).toEqual("Mary Doe");
  });

  it("should not be able to update an user with an used email", () => {
    expect(async () => {
      await usersRepository.store(
        new User({
          name: "John Doe",
          email: "john@doe.com",
          password: "my-secret-password",
        })
      );

      const user = await usersRepository.store(
        new User({
          name: "Mary Doe",
          email: "mary@doe.com",
          password: "my-secret-password",
        })
      );

      await updateUserService.execute({ id: user.id, email: "john@doe.com" });
    }).rejects.toBeInstanceOf(EmailUnavailableException);
  });

  it("should not be able to update an user that does not exists", () => {
    expect(async () => {
      await updateUserService.execute({
        id: "fake-user-id",
        name: "fake-name",
      });
    }).rejects.toBeInstanceOf(UserNotFoundException);
  });
});
