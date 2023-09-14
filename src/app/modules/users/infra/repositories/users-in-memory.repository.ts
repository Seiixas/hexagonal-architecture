import { CreateUserDTO } from "!domain/users/dtos/create-user-dto";
import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";

export class UsersRepositoryInMemory implements UsersRepository {
  private users: User[] = [];

  async find({ where }: { where: Partial<User> }): Promise<User | null> {
    if (where.id)
      return this.users.find((user) => user.id === where.id) ?? null;

    return this.users.find((user) => user.email === where.email) ?? null;
  }

  async remove(user: User): Promise<void> {
    const userPosition = this.users.findIndex((u) => u === user);
    this.users.splice(userPosition, 1);
  }

  async store({ password, name, email }: CreateUserDTO): Promise<User> {
    const user = new User({
      password,
      name,
      email,
    });

    this.users.push(user);

    return user;
  }

  async all(): Promise<User[]> {
    return this.users;
  }
}
