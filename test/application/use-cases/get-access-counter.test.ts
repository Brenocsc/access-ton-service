import { faker } from "@faker-js/faker";
import { AccessCounterInputDomain } from "@domain/contracts/add-access-counter-input";
import { GetAccessCounterUseCase } from "@application/use-cases/get-access-counter";
const countMock = 2;
const totalCountMock = jest.fn(() => countMock);
jest.mock("@infra/providers/dynamodb-counter-service", () => {
  return {
    DynamoDBCounterService: jest.fn().mockImplementation(() => {
      return {
        totalCount: totalCountMock
      };
    }),
  };
});

describe("GetAccessCounterUseCase", () => {
  test("should call totalCount service method", async () => {
    const getAccessCounterUseCase = new GetAccessCounterUseCase();
    const namespaceProperty = {
      namespace: faker.internet.domainName(),
    };
    const accessCounterInputDomain = new AccessCounterInputDomain(namespaceProperty);

    await getAccessCounterUseCase.execute(accessCounterInputDomain);
    
    expect(totalCountMock).toHaveBeenCalledTimes(1);
    expect(totalCountMock).toHaveBeenCalledWith(namespaceProperty.namespace);
  });

  test("should return total count value correctly", async () => {
    const getAccessCounterUseCase = new GetAccessCounterUseCase();
    const namespaceProperty = {
      namespace: faker.internet.domainName(),
    };
    const accessCounterInputDomain = new AccessCounterInputDomain(namespaceProperty);

    const countReceived = await getAccessCounterUseCase.execute(accessCounterInputDomain);
    
    expect(countReceived).toBe(countMock);
  });
});