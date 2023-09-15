import { User as UserLocal } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";

import { prisma } from "../../connection";
import { UserMapper } from "./user.mapper";

export class UsersRepositoryPrisma implements UsersRepository {
  async store(data: UserLocal): Promise<UserLocal> {
    const user = UserMapper.toPrisma(data);

    await prisma.user.create({ data: user });

    return data;
  }

  async find({ where }: { where: Partial<UserLocal> }): Promise<UserLocal> {
    const user = await prisma.user.findFirst({ where });

    return UserMapper.toLocal(user);
  }

  async remove(item: UserLocal): Promise<void> {
    const userPrisma = UserMapper.toPrisma(item);
    await prisma.user.delete({
      where: { id: userPrisma.id },
    });
  }

  async all(): Promise<UserLocal[]> {
    const users = await prisma.user.findMany();

    return users.map((user) => UserMapper.toLocal(user));
  }
}
