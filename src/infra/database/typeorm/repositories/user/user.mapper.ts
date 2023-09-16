import { User as UserLocal } from "!domain/users/user";
import { UserTypeORMEntity as UserTypeOrm } from "../../entities/user.entity";

export class UserMapper {
  public static toTypeORM(user: UserLocal): UserTypeOrm {
    const userTypeOrm = new UserTypeOrm();

    Object.assign(userTypeOrm, user);

    return userTypeOrm;
  }

  public static toLocal(user: UserTypeOrm): UserLocal {
    return new UserLocal({
      id: user.id,
      password: user.password,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  }
}
