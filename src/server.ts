import 'express-async-errors';
import { Server as OvernightServer } from '@overnightjs/core';
import cors from 'cors';
import express, { Application } from 'express';
import expressPino from 'express-pino-logger';
import swaggerUI from 'swagger-ui-express';

import packageJSON from '../package.json';
import { prisma } from './database/prisma';
import { makeControllers } from './factories/makeControllers';
import { handleErrorsMiddleware } from './middlewares/handleErrorsMiddleware';
import { handleRateLimiterMiddleware } from './middlewares/handleRateLimiterMiddleware';
import swaggerFile from './swagger.json';
import { logger } from './utils/logger';

export class Server extends OvernightServer {
  constructor(private port = 3000) {
    super();
  }

  public async initialize(): Promise<void> {
    this.setupExpress();
    await this.setupDocumentation();
    await this.setupDatabase();

    this.setupMiddlewares();
    this.setupControllers();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(expressPino({ logger }));
    this.app.use(cors({ origin: '*' }));
    this.app.use('/ready', (req, res) =>
      res.json({
        message: 'Server is ready',
      }),
    );
    this.app.use('/version', (_, res) =>
      res.json({
        name: packageJSON.name,
        author: packageJSON.author,
        version: packageJSON.version,
        description: packageJSON.description,
      }),
    );
  }

  public getApp(): Application {
    return this.app;
  }

  public async turnOn(): Promise<void> {
    this.app.listen(this.port, () =>
      logger.info(`Server is listening at port: ${this.port}`),
    );
  }

  private async setupDatabase(): Promise<void> {
    await prisma.$connect();
  }

  public async turnOff(): Promise<void> {
    await prisma.$disconnect();
  }

  private setupMiddlewares(): void {
    this.app.use(handleRateLimiterMiddleware);
  }

  private setupControllers(): void {
    this.addControllers(makeControllers(prisma));
  }

  private async setupDocumentation(): Promise<void> {
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
  }

  private setupErrorHandlers(): void {
    this.app.use(handleErrorsMiddleware);
  }
}
