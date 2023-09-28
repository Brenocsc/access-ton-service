import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBConfiguration } from "./configuration";

export class DynamoDBClientFactory {
  private config: DynamoDBConfiguration;

  constructor () {
    this.config = new DynamoDBConfiguration();
  }

  public build(): DynamoDBClient {
    const client = new DynamoDBClient(this.config);

    return client;
  }
}
