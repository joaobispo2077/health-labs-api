const {
  PORT = 3000,
  LOG_ENABLED = true,
  LOG_LEVEL = 'debug',
  MAX_REQUEST_PER_MINUTE = 30,
} = process.env;

export const config = {
  app: {
    port: Number(PORT),
    rateLimiter: {
      windowMs: 1 * 60 * 1000, // 1 minute
      max: Number(MAX_REQUEST_PER_MINUTE),
    },
  },
  logger: {
    enabled: Boolean(LOG_ENABLED),
    level: String(LOG_LEVEL),
  },
};
