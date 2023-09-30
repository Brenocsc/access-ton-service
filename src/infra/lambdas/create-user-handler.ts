import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { CreateUserUseCase } from "@application/use-cases/create-user";
import { CreateUserInput } from "../contracts/create-user-input";
import { created } from "@infra/http/response";
import { errorMapper } from "@infra/http/error-mapper";
import { EmptyBodyError } from "@domain/errors/empty-body";

const createUserUseCase = new CreateUserUseCase(); 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;
    if (!body) {
      throw new EmptyBodyError();
    }
  
    const rawPayload = JSON.parse(body);
    
    const createUserInput = new CreateUserInput(rawPayload);
  
    await createUserUseCase.execute(createUserInput.toDomain());
    
    return created({ message: "User created" });
  } catch (error) {
    return errorMapper(error);
  }
};
