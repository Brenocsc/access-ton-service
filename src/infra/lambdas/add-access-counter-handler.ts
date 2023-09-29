import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { AddAccessCounterUseCase } from "../../application/use-cases/add-access-counter";
import { AddAccessCounterInput } from "../contracts/add-access-counter-input";

const addAccessCounterUseCase = new AddAccessCounterUseCase(); 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;
    if (!body) {
      throw new Error("Empty body");
    }
  
    const rawPayload = JSON.parse(body);
    
    const addAccessCounterInput = new AddAccessCounterInput(rawPayload);
  
    await addAccessCounterUseCase.execute(addAccessCounterInput.toDomain());
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Added access counter",
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