import { CreateUserUseCase } from "@application/use-cases/create-user";
import { CreateUserInputDomain } from "@domain/contracts/create-user-input";
import { cpf } from "cpf-cnpj-validator";
import { faker } from "@faker-js/faker";
import { DynamoDBUserRepository } from "@infra/repositories/dynamodb/user/dynamodb-user-repository";
import { User } from "@domain/contracts/user";
jest.mock("@infra/repositories/dynamodb/user/dynamodb-user-repository");

describe("CreateUserUseCase", () => {
  const createUserUseCase = new CreateUserUseCase();

  test("should call store repository method", async () => {
    const userProperties = {
      cpf: cpf.generate(),
      name: faker.person.fullName(),
    };

    const createUserInputDomain = new CreateUserInputDomain(userProperties);
    const user = new User(userProperties);

    
    await createUserUseCase.execute(createUserInputDomain);
    
    expect(DynamoDBUserRepository.prototype.store).toHaveBeenCalledTimes(1);
    expect(DynamoDBUserRepository.prototype.store).toHaveBeenCalledWith(user);
  });
});