import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";
import { UsersRepositoryInMemory } from "!infra/database/in-memory/repositories/user/users-in-memory.repository";
import { ListUsersService } from "./list-users.service";

let usersRepository: UsersRepository;
let listUsersService: ListUsersService;
let user: User;

describe("List Places Use Case", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory();
    listUsersService = new ListUsersService(usersRepository);

    user = await usersRepository.store(
      new User({
        name: "John Doe",
        email: "john@doe.com",
        password: "my-secret-password",
      })
    );
  });

  it("should be able to list users", async () => {
    const users = await listUsersService.execute();

    expect(users).toHaveLength(1);
  });
});
