import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { CreateUserUseCase } from "@application/use-cases/create-user";
import { CreateUserInput } from "../contracts/create-user-input";

const createUserUseCase = new CreateUserUseCase(); 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;
    if (!body) {
      throw new Error("Empty body");
    }
  
    const rawPayload = JSON.parse(body);
    
    const createUserInput = new CreateUserInput(rawPayload);
  
    await createUserUseCase.execute(createUserInput.toDomain());
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User created",
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
