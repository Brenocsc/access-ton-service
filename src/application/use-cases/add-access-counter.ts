import { AccessCounterInputDomain } from "@domain/contracts/add-access-counter-input";
import { DynamoDBCounterService } from "@infra/providers/dynamodb-counter-service";
import { AccessCounterService } from "../services/access-counter";

export class AddAccessCounterUseCase {
  private accessCounterService: AccessCounterService;

  constructor () {
    this.accessCounterService = new DynamoDBCounterService();
  }

  public async execute (input: AccessCounterInputDomain): Promise<void> {
    await this.accessCounterService.addCount(input.namespace);
  }
}