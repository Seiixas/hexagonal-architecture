import { User as UserLocal } from "!domain/users/user";
import { UserTypeORMEntity as UserTypeOrm } from "../../entities/user.entity";

export class UserMapper {
  public static toTypeORM(user: UserLocal | Partial<UserLocal>): UserTypeOrm {
    const userTypeOrm = new UserTypeOrm();

    userTypeOrm.name = user.name;
    userTypeOrm.companies = user.companies;
    userTypeOrm.createdAt = user.createdAt;
    userTypeOrm.updatedAt = user.updatedAt;
    userTypeOrm.email = user.email;
    userTypeOrm.password = user.password;
    userTypeOrm.id = user.id;

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
