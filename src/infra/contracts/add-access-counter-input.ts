import { z } from "zod";
import { AccessCounterInputDomain } from "../../domain/contracts/add-access-counter-input";

const accessCounterInputSchema = z.object({
  namespace: z.string().regex(
    /^[A-Za-z0-9_\-.]{3,64}$/,
    "invalid namespace format"
  ),
});

export class AccessCounterInput {
  private namespace: string;

  constructor (input: z.input<typeof accessCounterInputSchema>) {
    const { namespace } = accessCounterInputSchema.parse(input);

    this.namespace = namespace;
  }

  toDomain() {
    return new AccessCounterInputDomain({
      namespace: this.namespace,
    });
  }
}