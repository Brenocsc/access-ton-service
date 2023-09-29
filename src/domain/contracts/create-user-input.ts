interface CreateUserAttributes {
  cpf: string;
  name: string;
}

export class CreateUserInputDomain {
  public cpf: string;
  public name: string;

  constructor (user: CreateUserAttributes) {
    this.cpf = user.cpf;
    this.name = user.name;
  }
}