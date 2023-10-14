import { User } from "./user";
import { BaseRepository } from "!domain/base/base.repository";

export abstract class UsersRepository extends BaseRepository<User> {}
