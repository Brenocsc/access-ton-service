import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { GetUserInput, GetUserInputType } from "@infra/contracts/get-user-input";
import { GetUserUseCase } from "@application/use-cases/get-user";

const getUserUseCase = new GetUserUseCase(); 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { queryStringParameters } = event;
    if (!queryStringParameters) {
      throw new Error("Empty params");
    }
  
    const getUserInput = new GetUserInput(queryStringParameters as GetUserInputType);
  
    const user = await getUserUseCase.execute(getUserInput.toDomain());
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        user
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
        error,
      }),
    };
  }
};
