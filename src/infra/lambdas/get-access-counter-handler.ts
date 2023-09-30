import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { AccessCounterInput, AccessCounterInputType } from "../contracts/add-access-counter-input";
import { GetAccessCounterUseCase } from "../../application/use-cases/get-access-counter";

const getAccessCounterUseCase = new GetAccessCounterUseCase(); 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { queryStringParameters } = event;
    if (!queryStringParameters) {
      throw new Error("Empty params");
    }
    
    const accessCounterInput = new AccessCounterInput(queryStringParameters as AccessCounterInputType);
  
    const totalCount = await getAccessCounterUseCase.execute(accessCounterInput.toDomain());
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        count: totalCount,
      }),
    };
  } catch (error) {
    console.log("!e", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
        error,
      }),
    };
  }
};
