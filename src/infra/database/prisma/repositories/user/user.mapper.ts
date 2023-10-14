import { User as UserLocal } from "!domain/users/user";
import { User as UserPrisma } from "@prisma/client";

export class UserMapper {
  public static toPrisma(user: UserLocal | Partial<UserLocal>): UserPrisma {
    return {
      id: user.id,
      password: user.password,
      name: user.name,
      email: user.email,
      updated_at: user.updatedAt,
      created_at: user.createdAt,
    };
  }

  public static toLocal(user: UserPrisma): UserLocal {
    return new UserLocal({
      id: user.id,
      password: user.password,
      name: user.name,
      email: user.email,
      updatedAt: user.updated_at,
      createdAt: user.created_at,
    });
  }
}
