import { Request } from 'express';
import { verify } from 'jsonwebtoken';

import { UnauthorizedError } from '../errors/api.error';

export async function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> {
  if (securityName === 'jwt') {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('AUTH_MISSING_TOKEN');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer') {
      throw new UnauthorizedError('AUTH_INVALID_TOKEN');
    }

    if (!token) {
      throw new UnauthorizedError('AUTH_INVALID_TOKEN');
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'default_secret') as {
        id: string;
        email: string;
        name: string;
      };

      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      };
    } catch (error) {
      throw new UnauthorizedError('AUTH_TOKEN_EXPIRED');
    }
  }

  throw new UnauthorizedError('AUTH_INSUFFICIENT_PERMISSIONS');
}
