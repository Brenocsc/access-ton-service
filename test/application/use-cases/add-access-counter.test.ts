import { faker } from "@faker-js/faker";
import { AddAccessCounterUseCase } from "@application/use-cases/add-access-counter";
import { AccessCounterInputDomain } from "@domain/contracts/add-access-counter-input";
import { DynamoDBCounterService } from "@infra/providers/dynamodb-counter-service";
jest.mock("@infra/providers/dynamodb-counter-service");

describe("AddAccessCounterUseCase", () => {
  const addAccessCounterUseCase = new AddAccessCounterUseCase();

  test("should call addCount service method", async () => {
    const namespaceProperty = {
      namespace: faker.internet.domainName(),
    };

    const accessCounterInputDomain = new AccessCounterInputDomain(namespaceProperty);
    
    await addAccessCounterUseCase.execute(accessCounterInputDomain);
    
    expect(DynamoDBCounterService.prototype.addCount).toHaveBeenCalledTimes(1);
    expect(DynamoDBCounterService.prototype.addCount).toHaveBeenCalledWith(namespaceProperty.namespace);
  });
});