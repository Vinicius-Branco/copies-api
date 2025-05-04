import { HttpStatusCode } from '../enums/status-code.enum';

export const ErrorType = {
  AUTH: 'auth',
  VALIDATION: 'validation',
  BUSINESS: 'business',
  SYSTEM: 'system',
} as const;

export type ErrorTypeValue = (typeof ErrorType)[keyof typeof ErrorType];

export interface ApiError {
  statusCode: HttpStatusCode;
  message: string;
  code: string;
  type: ErrorTypeValue;
  details?: Record<string, unknown>;
  suggestion?: string;
  timestamp: string;
}

export interface ValidationError extends ApiError {
  errors: {
    field: string;
    message: string;
    value?: unknown;
    suggestion?: string;
  }[];
}

export interface ErrorDefinition {
  code: string;
  message: string;
  suggestion: string;
}

export const ErrorCodes = {
  // Erros de autenticação
  AUTH_INVALID_CREDENTIALS: {
    code: 'AUTH001',
    message: 'Credenciais inválidas',
    suggestion: 'Verifique suas credenciais e tente novamente',
  },
  AUTH_TOKEN_EXPIRED: {
    code: 'AUTH002',
    message: 'Token expirado',
    suggestion: 'Faça login novamente para obter um novo token',
  },
  AUTH_INVALID_TOKEN: {
    code: 'AUTH003',
    message: 'Token inválido',
    suggestion: 'Faça login novamente para obter um novo token',
  },
  AUTH_MISSING_TOKEN: {
    code: 'AUTH004',
    message: 'Token não fornecido',
    suggestion: 'Inclua o token de autenticação no cabeçalho da requisição',
  },
  AUTH_INSUFFICIENT_PERMISSIONS: {
    code: 'AUTH005',
    message: 'Permissões insuficientes',
    suggestion: 'Contate o administrador para obter as permissões necessárias',
  },

  // Erros de validação
  VALIDATION_INVALID_INPUT: {
    code: 'VAL001',
    message: 'Entrada inválida',
    suggestion: 'Verifique os dados fornecidos e tente novamente',
  },
  VALIDATION_MISSING_FIELD: {
    code: 'VAL002',
    message: 'Campo obrigatório não fornecido',
    suggestion: 'Preencha todos os campos obrigatórios',
  },
  VALIDATION_INVALID_FORMAT: {
    code: 'VAL003',
    message: 'Formato inválido',
    suggestion: 'Verifique o formato dos dados fornecidos',
  },

  // Erros de negócio
  BUSINESS_USER_NOT_FOUND: {
    code: 'BUS001',
    message: 'Usuário não encontrado',
    suggestion: 'Verifique o ID do usuário e tente novamente',
  },
  BUSINESS_USER_ALREADY_EXISTS: {
    code: 'BUS002',
    message: 'Usuário já existe',
    suggestion: 'Tente fazer login ou use outro e-mail',
  },
  BUSINESS_USER_INVALID_STATUS: {
    code: 'BUS003',
    message: 'Status de usuário inválido',
    suggestion: 'Contate o suporte para mais informações',
  },

  // Erros de sistema
  SYSTEM_INTERNAL_ERROR: {
    code: 'SYS001',
    message: 'Erro interno do servidor',
    suggestion: 'Tente novamente mais tarde ou contate o suporte',
  },
  SYSTEM_DATABASE_ERROR: {
    code: 'SYS002',
    message: 'Erro no banco de dados',
    suggestion: 'Tente novamente mais tarde',
  },
  SYSTEM_EXTERNAL_ERROR: {
    code: 'SYS003',
    message: 'Erro no serviço externo',
    suggestion: 'Tente novamente mais tarde',
  },
  SYSTEM_RATE_LIMIT: {
    code: 'SYS004',
    message: 'Limite de requisições excedido',
    suggestion: 'Aguarde alguns minutos antes de tentar novamente',
  },
  SYSTEM_UNAVAILABLE: {
    code: 'SYS005',
    message: 'Serviço indisponível',
    suggestion: 'Tente novamente mais tarde',
  },
  USER_ALREADY_EXISTS: {
    code: 'USER001',
    message: 'Usuário já existe',
    suggestion: 'Tente outro email',
  },
  USER_NOT_FOUND: {
    code: 'USER002',
    message: 'Usuário não encontrado',
    suggestion: 'Verifique o ID do usuário',
  },
} as const;

export type ErrorCode = keyof typeof ErrorCodes;
