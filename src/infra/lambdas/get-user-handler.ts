import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { GetUserInput, GetUserInputType } from "@infra/contracts/get-user-input";
import { GetUserUseCase } from "@application/use-cases/get-user";
import { errorMapper } from "@infra/http/error-mapper";
import { EmptyQueryParamsError } from "@domain/errors/empty-query-params";
import { ok } from "@infra/http/response";

const getUserUseCase = new GetUserUseCase(); 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { queryStringParameters } = event;
    if (!queryStringParameters) {
      throw new EmptyQueryParamsError();
    }
  
    const getUserInput = new GetUserInput(queryStringParameters as GetUserInputType);
  
    const user = await getUserUseCase.execute(getUserInput.toDomain());
    
    return ok({ user });
  } catch (error) {
    return errorMapper(error);
  }
};
