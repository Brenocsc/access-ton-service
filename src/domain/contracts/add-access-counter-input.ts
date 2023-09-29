interface AddAccessCounterAttributes {
  namespace: string;
}

export class AddAccessCounterInputDomain {
  public namespace: string;

  constructor (input: AddAccessCounterAttributes) {
    this.namespace = input.namespace;
  }
}