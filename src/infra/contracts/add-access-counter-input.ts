import { z } from "zod";
import { AddAccessCounterInputDomain } from "../../domain/contracts/add-access-counter-input";

const addAccessCounterInputSchema = z.object({
  namespace: z.string().regex(
    /^[A-Za-z0-9_\-.]{3,64}$/,
    "invalid namespace format"
  ),
});

export class AddAccessCounterInput {
  private namespace: string;

  constructor (input: z.input<typeof addAccessCounterInputSchema>) {
    const { namespace } = addAccessCounterInputSchema.parse(input);

    this.namespace = namespace;
  }

  toDomain() {
    return new AddAccessCounterInputDomain({
      namespace: this.namespace,
    });
  }
}