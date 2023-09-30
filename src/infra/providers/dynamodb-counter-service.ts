import { AccessCounterService } from "@application/services/access-counter";
import { AccessCounter } from "@domain/contracts/access-counter";
import { AccessCounterRepository } from "@domain/repositories/access-counter-repository";
import { DynamoDBAccessCounterRepository } from "../repositories/dynamodb/access-counter/dynamodb-access-counter-repository";

export class DynamoDBCounterService implements AccessCounterService {
  private accessCounterRepository: AccessCounterRepository;

  constructor () {
    this.accessCounterRepository = new DynamoDBAccessCounterRepository();
  }

  private async findOrCreateAccessCounter (namespace: string): Promise<AccessCounter> {
    const accessCounter = await this.accessCounterRepository.findById(namespace);

    if (accessCounter) {
      accessCounter.count += 1;

      return accessCounter;
    } else {
      return new AccessCounter({
        namespace,
        count: 1,
      });
    }
  }

  async addCount (namespace: string): Promise<void> {
    const accessCounter = await this.findOrCreateAccessCounter(namespace);
    
    await this.accessCounterRepository.store(accessCounter);
  }

  async totalCount (namespace: string): Promise<number> {
    const accessCounter = await this.accessCounterRepository.findById(namespace);
    
    if (!accessCounter) {
      throw new Error("namespace don't found");
    }

    return accessCounter.count;
  }
}