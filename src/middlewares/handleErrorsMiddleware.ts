/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ValidationError as YupValidationError } from 'yup';

import { HttpError } from '@src/utils/errors/HttpError';
import { logger } from '@src/utils/logger';

export const handleErrorsMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  logger.info(`Error: ${error}`);

  const isValidationError = error instanceof YupValidationError;

  if (isValidationError) {
    logger.warn(`Validation error: ${error.errors.join(', ')}`);

    return response.status(422).json({
      message: error.errors.join(', '),
    });
  }

  const isHttpError = error instanceof HttpError;

  if (isHttpError) {
    logger.warn(`Http error message: ${error.message}`);
    logger.warn(`Http error status: ${error.statusCode}`);
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  logger.error(error);
  logger.error('An an unkown error has occurred');
  logger.error('@@Error Name: ', error.name);
  logger.error('@@Error message: ', error.message);
  logger.error(`@@Error stack: ${error.stack}`);

  return response.status(500).json({
    message: 'Something went wrong',
  });
};
