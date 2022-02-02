/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

import { config } from '@src/config';
import { TooManyRequestError } from '@src/utils/errors/TooManyRequestError';
import { logger } from '@src/utils/logger';

const rateLimiterConfig = config.app.rateLimiter;

export const handleRateLimiterMiddleware: RateLimitRequestHandler = rateLimit({
  windowMs: rateLimiterConfig.windowMs,
  max: rateLimiterConfig.max,
  keyGenerator(req: Request): string {
    return req.ip;
  },
  handler(request, _: Response): void {
    logger.info(`Too many requests from ip: ${request.ip}`);

    throw new TooManyRequestError('Too many requests from this IP');
  },
});
