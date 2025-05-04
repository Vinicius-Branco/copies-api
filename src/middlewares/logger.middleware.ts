import { NextFunction, Request, Response } from 'express';

import { logger } from '../config/logger.config';
import { CustomRequest } from '../interfaces/express.interface';

export function loggerMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const customReq = req as CustomRequest;
  customReq.logger = logger.child({
    requestId: customReq.requestId,
    userId: customReq.user?.id,
  });
  next();
}
