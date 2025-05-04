import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { createRequestLogger } from '../config/logger.config';
import { CustomRequest } from '../interfaces/express.interface';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = (req.headers['x-request-id'] as string) || uuidv4();
  const customReq = req as CustomRequest;

  // Pega o userId do req.user se estiver disponível (requisição autenticada)
  const userId = customReq.user?.id;
  const logger = createRequestLogger(requestId, userId);

  // Adiciona o logger e requestId ao objeto de requisição
  customReq.logger = logger;
  customReq.requestId = requestId;

  // Adiciona o requestId ao header da resposta
  res.setHeader('x-request-id', requestId);

  next();
};
