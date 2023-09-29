import { User } from "../contracts/user";

export interface UserRepository {
  store(user: User): Promise<void>;
  findById(cpf: string): Promise<User>;
}