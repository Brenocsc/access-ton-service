import { UserNotFoundError } from "@domain/errors/user-not-found";
import { GetUserInputDomain } from "@domain/contracts/get-user-input";
import { User } from "@domain/contracts/user";
import { UserRepository } from "@domain/repositories/user-repository";
import { DynamoDBUserRepository } from "@infra/repositories/dynamodb/user/dynamodb-user-repository";

export class GetUserUseCase {
  private userRepository: UserRepository;

  constructor () {
    this.userRepository = new DynamoDBUserRepository();
  }

  public async execute (input: GetUserInputDomain): Promise<User> {
    const user = await this.userRepository.findById(input.cpf);

    if (!user) {
      throw new UserNotFoundError(input.cpf);
    }

    return user;
  }
}