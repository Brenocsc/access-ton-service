export class UserNotFoundError extends Error {
  public constructor(id: string) {
    super(`User with cpf ${id} was not found`);
    Object.setPrototypeOf(this, UserNotFoundError.prototype); // precisa?
  }
}