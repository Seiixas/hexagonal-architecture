import { User } from "./user";
import { CreateUserDTO } from "./dtos/create-user-dto";
import { BaseRepository } from "!domain/base/base.repository";

export interface UsersRepository extends BaseRepository<User, CreateUserDTO> {}
