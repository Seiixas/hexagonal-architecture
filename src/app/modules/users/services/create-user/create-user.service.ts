import { CreateUserDTO } from "!domain/users/dtos/create-user-dto";
import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";
import { EmailUnavailableException } from "!modules/users/errors/email-unavailable.exception";

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

    return await this.usersRepository.store({
      name,
      email,
      password,
    });
  }
}
