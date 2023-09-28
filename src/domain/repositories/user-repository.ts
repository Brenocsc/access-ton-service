import { User } from "../contracts/user";

export interface UserRepository {
  store(user: User): Promise<void>;
  findByCPF(cpf: string): Promise<User>;
}