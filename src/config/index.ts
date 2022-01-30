const {
  APP_PORT = 3000,
  LOG_ENABLED = true,
  LOG_LEVEL = 'debug',
} = process.env;

export const config = {
  app: {
    port: Number(APP_PORT),
  },
  logger: {
    enabled: Boolean(LOG_ENABLED),
    level: String(LOG_LEVEL),
  },
};
