import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { User } from "../../../../domain/contracts/user";
import { UserRepository } from "../../../../domain/repositories/user-repository";
import { DynamoDBClientFactory } from "../client-factory";
import { DynamoDBConfiguration } from "../configuration";

export class DynamoDBUserRepository implements UserRepository {
  private client: DynamoDBClient;
  private documentClient: DynamoDBDocumentClient;
  private config: DynamoDBConfiguration;

  constructor() {
    const clientFactory = new DynamoDBClientFactory();

    this.config = new DynamoDBConfiguration();
    this.client = clientFactory.build();
    this.documentClient = DynamoDBDocumentClient.from(this.client);
  }

  async store(user: User): Promise<void> {
    const command = new PutCommand({
      TableName: this.config.tables.usersTable,
      Item: {
        cpf: user.cpf,
        name: user.name
      },
    });

    await this.documentClient.send(command);
  }

  async findById(cpf: string): Promise<User> {
    const command = new GetCommand({
      TableName: this.config.tables.usersTable,
      Key: {
        cpf,
      }
    });
  
    const { Item } = await this.documentClient.send(command);
    return Item as User;
  }
}