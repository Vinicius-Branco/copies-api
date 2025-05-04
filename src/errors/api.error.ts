import { HttpStatusCode } from '../enums/status-code.enum';
import { ErrorCode, ErrorCodes, ErrorTypeValue } from '../interfaces/error.interface';

export class ApiError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly code: string;
  public readonly type: ErrorTypeValue;
  public readonly details?: Record<string, unknown>;
  public readonly suggestion?: string;
  public readonly timestamp: string;

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    code: string,
    type: ErrorTypeValue,
    details?: Record<string, unknown>,
    suggestion?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.type = type;
    this.details = details;
    this.suggestion = suggestion;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      code: this.code,
      type: this.type,
      details: this.details,
      suggestion: this.suggestion,
      timestamp: this.timestamp,
    };
  }
}

// 401 Unauthorized
export class UnauthorizedError extends ApiError {
  constructor(errorDefinition: ErrorCode) {
    super(
      HttpStatusCode.UNAUTHORIZED,
      ErrorCodes[errorDefinition].message,
      ErrorCodes[errorDefinition].code,
      'auth',
      undefined,
      ErrorCodes[errorDefinition].suggestion
    );
  }
}

// 403 Forbidden
export class ForbiddenError extends ApiError {
  constructor(errorDefinition: ErrorCode) {
    super(
      HttpStatusCode.FORBIDDEN,
      ErrorCodes[errorDefinition].message,
      ErrorCodes[errorDefinition].code,
      'auth',
      undefined,
      ErrorCodes[errorDefinition].suggestion
    );
  }
}

// 404 Not Found
export class NotFoundError extends ApiError {
  constructor(errorDefinition: ErrorCode) {
    super(
      HttpStatusCode.NOT_FOUND,
      ErrorCodes[errorDefinition].message,
      ErrorCodes[errorDefinition].code,
      'business',
      undefined,
      ErrorCodes[errorDefinition].suggestion
    );
  }
}

// 409 Conflict
export class ConflictError extends ApiError {
  constructor(errorDefinition: ErrorCode) {
    super(
      HttpStatusCode.CONFLICT,
      ErrorCodes[errorDefinition].message,
      ErrorCodes[errorDefinition].code,
      'business',
      undefined,
      ErrorCodes[errorDefinition].suggestion
    );
  }
}

// 422 Unprocessable Entity
export class ValidationError extends ApiError {
  constructor(errorDefinition: ErrorCode) {
    super(
      HttpStatusCode.BAD_REQUEST,
      ErrorCodes[errorDefinition].message,
      ErrorCodes[errorDefinition].code,
      'validation',
      undefined,
      ErrorCodes[errorDefinition].suggestion
    );
  }
}

// 429 Too Many Requests
export class TooManyRequestsError extends ApiError {
  constructor(errorDefinition: ErrorCode) {
    super(
      HttpStatusCode.TOO_MANY_REQUESTS,
      ErrorCodes[errorDefinition].message,
      ErrorCodes[errorDefinition].code,
      'system',
      undefined,
      ErrorCodes[errorDefinition].suggestion
    );
  }
}

// 500 Internal Server Error
export class InternalServerError extends ApiError {
  constructor(errorDefinition: ErrorCode) {
    super(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      ErrorCodes[errorDefinition].message,
      ErrorCodes[errorDefinition].code,
      'system',
      undefined,
      ErrorCodes[errorDefinition].suggestion
    );
  }
}

// 503 Service Unavailable
export class ServiceUnavailableError extends ApiError {
  constructor(errorDefinition: ErrorCode) {
    super(
      HttpStatusCode.SERVICE_UNAVAILABLE,
      ErrorCodes[errorDefinition].message,
      ErrorCodes[errorDefinition].code,
      'system',
      undefined,
      ErrorCodes[errorDefinition].suggestion
    );
  }
}

// User Domain
export class UserNotFoundError extends NotFoundError {
  constructor() {
    super('BUSINESS_USER_NOT_FOUND');
  }
}

export class UserAlreadyExistsError extends ConflictError {
  static readonly status = HttpStatusCode.CONFLICT;
  static readonly error = ErrorCodes.BUSINESS_USER_ALREADY_EXISTS;

  constructor() {
    super('BUSINESS_USER_ALREADY_EXISTS');
  }
}
