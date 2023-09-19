import { UsersRepository } from "!domain/users/users.repository";
import { UnauthorizedUserException } from "!modules/users/errors/unauthorized-user.exception";
import { HasherProvider } from "app/providers/hasher/hasher.provider";
import { JwtProvider } from "app/providers/jwt/jwt.provider";

interface AuthenticateUserDTO {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hasherProvider: HasherProvider,
    private readonly jwtProvider: JwtProvider
  ) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    const user = await this.usersRepository.find({ where: { email } });

    if (!user) throw new UnauthorizedUserException();

    const passwordMatches = await this.hasherProvider.compare(
      password,
      user.password
    );

    if (!passwordMatches) throw new UnauthorizedUserException();

    const token = this.jwtProvider.sign({
      email: user.email,
      id: user.id,
    });

    return token;
  }
}
