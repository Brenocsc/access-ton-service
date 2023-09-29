import countapi from "countapi-js";
import { AccessCounterService } from "../../application/services/access-counter";

export class CountAPIService implements AccessCounterService {
  async addCount (namespace: string): Promise<void> {
    try {
      const res = await countapi.create({
        namespace
      });
  
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  async totalCount (namespace: string): Promise<number> {
    const count = await countapi.visits(namespace);

    return count.value;
  }
}