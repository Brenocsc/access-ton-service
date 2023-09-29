import { AccessCounterService } from "../../application/services/access-counter";
import { AccessCounterRepository } from "../../domain/repositories/access-counter-repository";
import { DynamoDBAccessCounterRepository } from "../repositories/dynamodb/access-counter/dynamodb-access-counter-repository";

export class DynamoDBCounterService implements AccessCounterService {
  private accessCounterRepository: AccessCounterRepository;

  constructor () {
    this.accessCounterRepository = new DynamoDBAccessCounterRepository();
  }

  async addCount (namespace: string): Promise<void> {
    const accessCounter = await this.accessCounterRepository.findById(namespace);
    accessCounter.count += 1;

    await this.accessCounterRepository.store(accessCounter);
  }

  async totalCount (namespace: string): Promise<number> {
    const accessCounter = await this.accessCounterRepository.findById(namespace);

    return accessCounter.count;
  }
}