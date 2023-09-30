import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { AccessCounterInput, AccessCounterInputType } from "../contracts/add-access-counter-input";
import { GetAccessCounterUseCase } from "@application/use-cases/get-access-counter";
import { errorMapper } from "@infra/http/error-mapper";
import { EmptyQueryParamsError } from "@domain/errors/empty-query-params";
import { ok } from "@infra/http/response";

const getAccessCounterUseCase = new GetAccessCounterUseCase(); 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { queryStringParameters } = event;
    if (!queryStringParameters) {
      throw new EmptyQueryParamsError();
    }
    
    const accessCounterInput = new AccessCounterInput(queryStringParameters as AccessCounterInputType);
  
    const totalCount = await getAccessCounterUseCase.execute(accessCounterInput.toDomain());
    
    return ok({ count: totalCount });
  } catch (error) {
    return errorMapper(error);
  }
};
