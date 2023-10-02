import { CreateUserInputDomain } from "@domain/contracts/create-user-input";
import { User } from "@domain/contracts/user";
import { UserRepository } from "@domain/repositories/user-repository";
import { DynamoDBUserRepository } from "@infra/repositories/dynamodb/user/dynamodb-user-repository";

export class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor () {
    this.userRepository = new DynamoDBUserRepository();
  }

  public async execute (input: CreateUserInputDomain): Promise<void> {
    const user = new User(input);

    await this.userRepository.store(user);
  }
}