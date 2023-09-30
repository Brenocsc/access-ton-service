export class AccessCounterNotFoundError extends Error {
  public constructor(id: string) {
    super(`Access Counter with namespace ${id} was not found`);
    Object.setPrototypeOf(this, AccessCounterNotFoundError.prototype); // precisa?
  }
}