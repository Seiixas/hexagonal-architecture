import { UsersRepository } from "!domain/users/users.repository";

import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";

export class DeleteUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.find({
      where: { id },
    });

    if (!user) throw new UserNotFoundException();

    await this.usersRepository.remove(user);
  }
}
