import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClientFactory } from "../client-factory";
import { DynamoDBConfiguration } from "../configuration";
import { AccessCounter } from "../../../../domain/contracts/access-counter";
import { AccessCounterRepository } from "../../../../domain/repositories/access-counter-repository";

export class DynamoDBAccessCounterRepository implements AccessCounterRepository {
  private client: DynamoDBClient;
  private documentClient: DynamoDBDocumentClient;
  private config: DynamoDBConfiguration;

  constructor() {
    const clientFactory = new DynamoDBClientFactory();

    this.config = new DynamoDBConfiguration();
    this.client = clientFactory.build();
    this.documentClient = DynamoDBDocumentClient.from(this.client);
  }

  async store(accessCounter: AccessCounter): Promise<void> {
    const command = new PutCommand({
      TableName: this.config.tables.usersTable,
      Item: {
        namespace: accessCounter.namespace,
        count: accessCounter.count
      },
    });

    await this.documentClient.send(command);
  }

  async findById(namespace: string): Promise<AccessCounter> {
    const command = new GetCommand({
      TableName: this.config.tables.usersTable,
      Key: {
        namespace,
      }
    });
  
    const { Item } = await this.documentClient.send(command);
    return Item as AccessCounter;
  }
}
