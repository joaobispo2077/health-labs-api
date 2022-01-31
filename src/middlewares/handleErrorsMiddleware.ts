/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ValidationError as YupValidationError } from 'yup';

import { HttpError } from '@src/utils/errors/HttpError';

export const handleErrorsMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  const isValidationError = error instanceof YupValidationError;

  if (isValidationError) {
    return response.status(422).json({
      message: error.errors.join(', '),
    });
  }

  const isHttpError = error instanceof HttpError;

  if (isHttpError) {
    return response.status(error.status).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    message: 'Something went wrong',
  });
};
