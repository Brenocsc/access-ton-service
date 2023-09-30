import { cpf } from "cpf-cnpj-validator";
import { z } from "zod";
import { GetUserInputDomain } from "../../domain/contracts/get-user-input";

const getUserInputSchema = z.object({
  cpf: z.string().refine((cpfCandidate) => cpf.isValid(cpfCandidate), {
    message: "invalid CPF",
  }),
});

export type GetUserInputType = z.input<typeof getUserInputSchema>

export class GetUserInput {
  private cpf: string;

  constructor (input: GetUserInputType) {
    const { cpf } = getUserInputSchema.parse(input);

    this.cpf = cpf;
  }

  toDomain() {
    return new GetUserInputDomain({
      cpf: this.cpf,
    });
  }
}