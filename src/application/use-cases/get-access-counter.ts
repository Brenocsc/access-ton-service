import { AccessCounterInputDomain } from "@domain/contracts/add-access-counter-input";
import { DynamoDBCounterService } from "@infra/providers/dynamodb-counter-service";
import { AccessCounterService } from "../services/access-counter";

export class GetAccessCounterUseCase {
  private accessCounterService: AccessCounterService;

  constructor () {
    this.accessCounterService = new DynamoDBCounterService();
  }

  public async execute (input: AccessCounterInputDomain): Promise<number> {
    const totalCount = await this.accessCounterService.totalCount(input.namespace);

    return totalCount; // TODO: returnar em um DTO
  }
}