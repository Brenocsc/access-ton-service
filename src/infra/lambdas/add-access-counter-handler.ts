import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { AddAccessCounterUseCase } from "@application/use-cases/add-access-counter";
import { AccessCounterInput, AccessCounterInputType } from "@infra/contracts/add-access-counter-input";

const addAccessCounterUseCase = new AddAccessCounterUseCase(); 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;
    if (!body) {
      throw new Error("Empty body");
    }
  
    const rawPayload = JSON.parse(body) as AccessCounterInputType;
    
    const addAccessCounterInput = new AccessCounterInput(rawPayload);
  
    await addAccessCounterUseCase.execute(addAccessCounterInput.toDomain());
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Added access counter", // TODO retornar o valor do count
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "some error happened",
        error,
      }),
    };
  }
};
