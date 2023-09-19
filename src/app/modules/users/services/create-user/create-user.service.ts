import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";
import { HasherProvider } from "!infra/providers/hasher/hasher.provider";
import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hasherProvider: HasherProvider
  ) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.find({
      where: { email },
    });

    if (userAlreadyExists) throw new EmailUnavailableException();

    const passwordHashed = await this.hasherProvider.hash(password);

    const user = new User({
      name,
      email,
      password: passwordHashed,
    });

    return await this.usersRepository.store(user);
  }
}
