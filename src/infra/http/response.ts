import { APIGatewayProxyResult } from "aws-lambda";
import { isString } from "lodash";

export const response = (
  statusCode: number,
  data: unknown,
): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify(isString(data) ? { message: data } : data),
});

export const ok = (data) => response(200, data);
export const created = (data) => response(200, data);
export const noContent = () => response(204, undefined);
export const badRequest = (data)  => response(400, data);
export const notFound = (data) => response(404, data);
export const internalServerError = (
  data = { message: "Internal server error" },
) => response(500, data);
