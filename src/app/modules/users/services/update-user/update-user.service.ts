import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";

import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";
import { UserNotFoundException } from "!modules/users/errors/user-not-found.exception";

interface UpdateUserUseCaseDTO extends Partial<User> {
  id: string;
}

export class UpdateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id, name, password, email }: UpdateUserUseCaseDTO) {
    if (email) {
      const userAlreadyExists = await this.usersRepository.find({
        where: { email },
      });

      if (userAlreadyExists) throw new EmailUnavailableException();
    }

    const user = await this.usersRepository.find({ where: { id } });

    if (!user) throw new UserNotFoundException();

    await this.usersRepository.update(user, { name, password, email });
  }
}
