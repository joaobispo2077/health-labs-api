const { PORT = 3000, LOG_ENABLED = true, LOG_LEVEL = 'debug' } = process.env;

export const config = {
  app: {
    port: Number(PORT),
  },
  logger: {
    enabled: Boolean(LOG_ENABLED),
    level: String(LOG_LEVEL),
  },
};
