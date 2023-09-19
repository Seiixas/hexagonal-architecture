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

  async store(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async all(): Promise<User[]> {
    return this.users;
  }

  async update(old: User, _new: Partial<User>): Promise<void> {
    const userToUpdate = this.users.findIndex((user) => user.id === old.id);

    this.users[userToUpdate].name = _new.name ?? old.name;
    this.users[userToUpdate].password = _new.password ?? old.password;
    this.users[userToUpdate].companies = _new.companies ?? old.companies;
    this.users[userToUpdate].email = _new.email ?? old.email;
  }
}
