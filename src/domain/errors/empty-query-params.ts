export class EmptyQueryParamsError extends Error {
  public constructor() {
    super("Request with empty query params");
    Object.setPrototypeOf(this, EmptyQueryParamsError.prototype);
  }
}