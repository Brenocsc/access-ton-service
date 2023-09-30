import { APIGatewayProxyResult } from "aws-lambda";
import { badRequest, internalServerError, notFound } from "./response";
import { ZodError } from "zod";

const badRequestErrorTypes = [
  "EmptyBodyError",
  "EmptyQueryParamsError"
];

const notFoundErrorTypes = [
  "AccessCounterNotFoundError",
  "UserNotFoundError"
];

export const errorMapper = (err: Error): APIGatewayProxyResult => {
  const errorType = err.constructor.name;

  if (errorType === "ZodError") {
    return badRequest({
      issues: (err as ZodError).issues,
    });
  }

  if (badRequestErrorTypes.includes(errorType)) {
    return badRequest({ message: err.message });
  }

  if (notFoundErrorTypes.includes(errorType)) {
    return notFound({ message: err.message });
  }

  return internalServerError();
};
