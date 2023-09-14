import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";
import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<Omit<User, "password">> {
    const userAlreadyExists = await this.usersRepository.find({
      where: { email },
    });

    if (userAlreadyExists) throw new EmailUnavailableException();

    const user = new User({
      name,
      email,
      password,
    });

    return await this.usersRepository.store(user);
  }
}
