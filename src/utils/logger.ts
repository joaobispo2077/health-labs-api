import pino from 'pino';

import { config } from '@src/config';

export const logger = pino({
  enabled: config.logger.enabled,
  level: config.logger.level,
});
