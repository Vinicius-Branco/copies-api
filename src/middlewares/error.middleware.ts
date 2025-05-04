import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';

import { HttpStatusCode } from '../enums/status-code.enum';
import { ApiError, InternalServerError } from '../errors/api.error';
import { ErrorCodes } from '../interfaces/error.interface';
import { CustomRequest } from '../interfaces/express.interface';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  const { logger } = req as CustomRequest;

  if (error instanceof ValidateError) {
    const details = Object.entries(error.fields).map(([field, message]) => ({
      field,
      message,
    }));

    logger.warn('Erro de validação', { details });

    return res.status(HttpStatusCode.VALIDATION_ERROR).json({
      message: 'Erro de validação',
      code: ErrorCodes.VALIDATION_INVALID_INPUT.code,
      type: 'validation',
      details: { errors: details },
      suggestion: ErrorCodes.VALIDATION_INVALID_INPUT.suggestion,
      timestamp: new Date().toISOString(),
    });
  }

  if (error instanceof ApiError) {
    logger.warn('Erro de negócio', {
      type: error.type,
      code: error.code,
      message: error.message,
    });

    return res.status(error.statusCode).json(error);
  }

  logger.error('Erro interno do servidor', {
    error: error.message,
    stack: error.stack,
  });

  const internalError = new InternalServerError('SYSTEM_INTERNAL_ERROR');
  return res.status(internalError.statusCode).json(internalError);
}
