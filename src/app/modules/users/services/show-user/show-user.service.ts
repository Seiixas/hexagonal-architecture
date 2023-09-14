import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";
import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";

export class ShowUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.find({
      where: { id: userId },
    });

    if (!user) throw new UserNotFoundException();

    return user;
  }
}
