export class DynamoDBConfiguration {
  public readonly region = "localhost"; // buscar por env
  public readonly endpoint = "http://0.0.0.0:8000"; // buscar por env
  public readonly tables = {
    usersTable: "users-table", // buscar por env
    accessCounterTable: "access-counter-table"
  };
}