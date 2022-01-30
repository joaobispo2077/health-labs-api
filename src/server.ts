/* eslint-disable no-console */
import { Server as OvernightServer } from '@overnightjs/core';
import cors from 'cors';
import express, { Application } from 'express';

import { prisma } from './database/prisma';
import { makeControllers } from './factories/makeControllers';
import { logger } from './utils/logger';

export class Server extends OvernightServer {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    await this.setupDocumentation();
    await this.setupDatabase();

    this.setupControllers();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: '*' }));
  }

  public getApp(): Application {
    return this.app;
  }

  public async turnOn(): Promise<void> {
    this.app.listen(this.port, () =>
      logger.info(`Server is listening in port: ${this.port}`),
    );
  }

  public async turnOff(): Promise<void> {
    await prisma.$disconnect();
  }

  private setupControllers(): void {
    this.addControllers(makeControllers(prisma));
  }

  private async setupDocumentation(): Promise<void> {
    // TODO: this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiSchema));
  }

  private setupErrorHandlers(): void {
    // TODO: this.app.use(handleError);
  }

  private async setupDatabase(): Promise<void> {
    await prisma.$connect();
  }
}
