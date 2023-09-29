import { AccessCounter } from "../contracts/access-counter";

export interface AccessCounterRepository {
  store(accessCounter: AccessCounter): Promise<void>;
  findById(namespace: string): Promise<AccessCounter>;
}