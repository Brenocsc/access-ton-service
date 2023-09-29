import { cpf } from "cpf-cnpj-validator";
import { z } from "zod";
import { CreateUserInputDomain } from "../../domain/contracts/create-user-input";

const createUserInputSchema = z.object({
  cpf: z.string().refine((cpfCandidate) => cpf.isValid(cpfCandidate), {
    message: "invalid CPF",
  }),
  name: z.string(),
});

export class CreateUserInput {
  private cpf: string;
  private name: string;

  constructor (input: z.input<typeof createUserInputSchema>) {
    const { cpf, name } = createUserInputSchema.parse(input);

    this.cpf = cpf;
    this.name = name;
  }

  toDomain() {
    return new CreateUserInputDomain({
      cpf: this.cpf,
      name: this.name,
    });
  }
}