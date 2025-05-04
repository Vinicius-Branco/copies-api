import pino from 'pino';

export const createRequestLogger = (requestId: string, userId?: string) => {
  return pino({
    level: process.env.LOG_LEVEL || 'info',
    base: {
      requestId,
      ...(userId && { userId }),
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
  });
};

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});
