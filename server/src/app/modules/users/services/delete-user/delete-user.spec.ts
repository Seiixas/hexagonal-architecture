import { UsersRepository } from "!domain/users/users.repository";
import { DeleteUserService } from "./delete-user.service";
import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";
import { User } from "!domain/users/user";
import { UsersRepositoryInMemory } from "!infra/database/in-memory/repositories/user/users-in-memory.repository";

let deleteUserService: DeleteUserService;
let usersRepository: UsersRepository;

describe("Delete User Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    deleteUserService = new DeleteUserService(usersRepository);
  });

  it("should be able to delete an user", async () => {
    const user = await usersRepository.store(
      new User({
        name: "John Doe",
        email: "john@doe.com",
        password: "my-secret-password",
      })
    );

    await deleteUserService.execute(user.id);

    const userDeleted = await usersRepository.find({
      where: { id: user.id },
    });

    expect(userDeleted).toBeNull();
  });

  it("should not be able to delete an user that does not exists", () => {
    expect(async () => {
      await deleteUserService.execute("fake-user-id");
    }).rejects.toBeInstanceOf(UserNotFoundException);
  });
});
