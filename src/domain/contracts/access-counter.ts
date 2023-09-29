interface AccessCounterAttributes {
  namespace: string;
  count: number;
}

export class AccessCounter {
  public namespace: string;
  public count: number;

  constructor (accessCounter: AccessCounterAttributes) {
    this.namespace = accessCounter.namespace;
    this.count = accessCounter.count;
  }
}