import './config/moduleAliases';
import { Server } from './server';

import { config } from '@src/config';
import { logger } from '@src/utils/logger';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

const { port } = config.app;

const listenUnhandledRejections: NodeJS.UnhandledRejectionListener = (
  error,
  promise,
) => {
  logger.error(
    `App exiting due to an unhandle promise: ${promise} and error: ${error}`,
  );

  throw error;
};

const listenUncaughtRejections: NodeJS.UncaughtExceptionListener = (error) => {
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
};

const handleExitSignals = async (server: Server) => {
  try {
    await server.turnOff();
    logger.info('App exited with success.');
    process.exit(ExitStatus.Success);
  } catch (err) {
    logger.error(`App exited with error: ${err}`);
    process.exit(ExitStatus.Failure);
  }
};

process.on('unhandledRejection', listenUnhandledRejections);

process.on('uncaughtException', listenUncaughtRejections);

const main = async (): Promise<void> => {
  try {
    const server = new Server(port);
    await server.init();
    await server.turnOn();

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

    exitSignals.forEach((signal) =>
      process.on(signal, () => handleExitSignals(server)),
    );
  } catch (err) {
    logger.error(`Application exited with error: ${err}`);
    process.exit(ExitStatus.Failure);
  }
};

main();
