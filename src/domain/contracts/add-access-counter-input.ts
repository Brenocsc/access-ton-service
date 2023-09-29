interface AccessCounterAttributes {
  namespace: string;
}

export class AccessCounterInputDomain {
  public namespace: string;

  constructor (input: AccessCounterAttributes) {
    this.namespace = input.namespace;
  }
}