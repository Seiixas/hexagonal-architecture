import { UsersRepositoryInMemory } from "!modules/users/infra/repositories/users-in-memory.repository";
import { UsersRepository } from "!domain/users/users.repository";
import { ShowUserService } from "./show-user.service";
import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";

let showUserService: ShowUserService;
let usersRepository: UsersRepository;

describe("Show User Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    showUserService = new ShowUserService(usersRepository);
  });

  it("should be able show an user", async () => {
    const user = await usersRepository.store({
      name: "John Doe",
      email: "john@doe.com",
      password: "my-secret-password",
    });

    const userProfile = await showUserService.execute(user.id);

    expect(userProfile).toBeDefined();
    expect(userProfile.id).toEqual(user.id);
  });

  it("should not be able to show an user that does not exists", () => {
    expect(async () => {
      await showUserService.execute("fake-user-id");
    }).rejects.toBeInstanceOf(UserNotFoundException);
  });
});
