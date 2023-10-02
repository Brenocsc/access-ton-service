export class DynamoDBConfiguration {
  public readonly region = "localhost";
  public readonly endpoint = "http://0.0.0.0:8000";
  public readonly tables = {
    usersTable: "users-table",
    accessCounterTable: "access-counter-table"
  };
}