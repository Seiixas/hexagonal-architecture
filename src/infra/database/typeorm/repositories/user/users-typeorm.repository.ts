import { User } from "!domain/users/user";
import { UsersRepository } from "!domain/users/users.repository";
import { Repository } from "typeorm";
import { UserMapper } from "./user.mapper";
import { UserTypeORMEntity } from "../../entities/user.entity";

export class UsersRepositoryTypeORM implements UsersRepository {
  constructor(private readonly _repository: Repository<UserTypeORMEntity>) {}

  async store(data: User): Promise<User> {
    const user = UserMapper.toTypeORM(data);

    return UserMapper.toLocal(await this._repository.save(user));
  }

  async find({ where }: { where: Partial<User> }): Promise<User> {
    const user = await this._repository.findOne({ where });

    return UserMapper.toLocal(user);
  }

  async remove(item: User): Promise<void> {
    await this._repository.delete(item.id);
  }

  async all(): Promise<User[]> {
    const users = await this._repository.find();

    return users.map((user) => UserMapper.toLocal(user));
  }
}
