interface UserAttributes {
  cpf: string;
  name: string;
}

export class User {
  public cpf: string;
  public name: string;

  constructor (user: UserAttributes) {
    this.cpf = user.cpf;
    this.name = user.name;
  }
}