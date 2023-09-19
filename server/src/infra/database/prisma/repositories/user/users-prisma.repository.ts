import { User as UserLocal } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";
import { PrismaClient } from "@prisma/client";

import { UserMapper } from "./user.mapper";

export class UsersRepositoryPrisma implements UsersRepository {
  constructor(private readonly _repository: PrismaClient) {}

  async update(old: UserLocal, _new: Partial<UserLocal>): Promise<void> {
    const oldUser = UserMapper.toPrisma(old);
    const newUser = UserMapper.toPrisma(_new);

    await this._repository.user.update({
      data: { ...newUser },
      where: {
        id: oldUser.id,
      },
    });
  }

  async store(data: UserLocal): Promise<UserLocal> {
    const user = UserMapper.toPrisma(data);

    const userCreated = await this._repository.user.create({ data: user });

    return UserMapper.toLocal(userCreated);
  }

  async find({ where }: { where: Partial<UserLocal> }): Promise<UserLocal> {
    const user = await this._repository.user.findFirst({ where });

    return user ? UserMapper.toLocal(user) : null;
  }

  async remove(item: UserLocal): Promise<void> {
    const userPrisma = UserMapper.toPrisma(item);
    await this._repository.user.delete({
      where: { id: userPrisma.id },
    });
  }

  async all(): Promise<UserLocal[]> {
    const users = await this._repository.user.findMany();

    return users.map((user) => UserMapper.toLocal(user));
  }
}
