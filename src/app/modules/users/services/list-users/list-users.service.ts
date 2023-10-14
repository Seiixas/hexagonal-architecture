import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";

export class ListUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    return await this.usersRepository.all();
  }
}
