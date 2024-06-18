import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { pick } from '../utils/pick';
import HandleError from '../utils/api-error';
import { StatusCodes } from 'http-status-codes';
import { handleErrorResponse } from '../utils/error-response';
export const validate =
  (schema: object | any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, ['params', 'query', 'body']);
    const { value, error } = Joi.compile(validSchema).validate(object);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      return next(
        handleErrorResponse(StatusCodes.BAD_REQUEST, errorMessage, res)
      );
    }
    Object.assign(req, value);
    next();
  };
