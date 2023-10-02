import { faker } from "@faker-js/faker";
import { User } from "@domain/contracts/user";
import { cpf } from "cpf-cnpj-validator";
import { GetUserInputDomain } from "@domain/contracts/get-user-input";
import { GetUserUseCase } from "@application/use-cases/get-user";
import { UserNotFoundError } from "@domain/errors/user-not-found";

const userMock = new User({
  cpf: cpf.generate(),
  name: faker.person.fullName(),
});
let findByIdMock = jest.fn(() => userMock);
jest.mock("@infra/repositories/dynamodb/user/dynamodb-user-repository", () => {
  return {
    DynamoDBUserRepository: jest.fn().mockImplementation(() => {
      return {
        findById: findByIdMock
      };
    }),
  };
});

describe("GetUserUseCase", () => {
  test("should call findById repository method", async () => {
    const getUserUseCase = new GetUserUseCase();
    const cpfProperty = {
      cpf: cpf.generate(),
    };
    const getUserInputDomain = new GetUserInputDomain(cpfProperty);

    await getUserUseCase.execute(getUserInputDomain);
    
    expect(findByIdMock).toHaveBeenCalledTimes(1);
    expect(findByIdMock).toHaveBeenCalledWith(cpfProperty.cpf);
  });

  test("should return user correctly", async () => {
    const getUserUseCase = new GetUserUseCase();
    const cpfProperty = {
      cpf: cpf.generate(),
    };
    const getUserInputDomain = new GetUserInputDomain(cpfProperty);

    const userReceived = await getUserUseCase.execute(getUserInputDomain);
    
    expect(userReceived).toBe(userMock);
  });

  test("should return error if not found user", async () => {
    findByIdMock = jest.fn();

    const getUserUseCase = new GetUserUseCase();
    const cpfProperty = {
      cpf: cpf.generate(),
    };
    const getUserInputDomain = new GetUserInputDomain(cpfProperty);

    expect.assertions(1);

    try {
      await getUserUseCase.execute(getUserInputDomain);
    } catch (err) {
      expect(err instanceof UserNotFoundError).toBe(true);
    }
  });
});