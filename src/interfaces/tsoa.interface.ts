import { Request } from 'express';

import { User } from '../entities/user.entity';

export interface TsoaRequest extends Request {
  user?: User;
  logger: {
    info: (message: string) => void;
    error: (message: string) => void;
    warn: (message: string) => void;
    debug: (message: string) => void;
    getRequestId: () => string;
  };
  requestId: string;
}
