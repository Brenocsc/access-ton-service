export class EmptyBodyError extends Error {
  public constructor() {
    super("Request with empty body");
    Object.setPrototypeOf(this, EmptyBodyError.prototype);
  }
}