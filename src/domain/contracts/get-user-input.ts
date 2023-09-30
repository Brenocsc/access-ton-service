interface GetUserAttributes {
  cpf: string;
}

export class GetUserInputDomain {
  public cpf: string;

  constructor (user: GetUserAttributes) {
    this.cpf = user.cpf;
  }
}