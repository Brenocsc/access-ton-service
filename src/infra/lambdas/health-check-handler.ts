import { APIGatewayProxyResult, Handler } from "aws-lambda";
import { errorMapper } from "@infra/http/error-mapper";
import { ok } from "@infra/http/response";

export const handler: Handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return ok({ message: "Healthy service" });
  } catch (error) {
    return errorMapper(error);
  }
};
