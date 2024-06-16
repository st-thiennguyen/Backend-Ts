import { Response } from "express";
import { StatusCodes } from "http-status-codes";
export const handleErrorResponse = (
  statusCode: StatusCodes,
  message: string,
  res: Response
) => res.status(statusCode).json({ error: message });
