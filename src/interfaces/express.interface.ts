import { Request } from 'express';
import { Logger as PinoLogger } from 'pino';

export type Logger = PinoLogger;

export interface CustomRequest extends Request {
  logger: Logger;
  userId?: string;
  requestId: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}
