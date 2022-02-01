import { PrismaClient } from '@prisma/client';

import { BaseController } from '@src/controllers';
import { ExamsControllers } from '@src/controllers/ExamsController';
import { LaboratoriesControllers } from '@src/controllers/LaboratoriesControllers';
import { PrismaExamsRepositories } from '@src/repositories/implementations/PrismaExamsRepositories';
import { PrismaLaboratoriesRepositories } from '@src/repositories/implementations/PrismaLaboratoriesRepositories';
import { ExamsServices } from '@src/services/ExamsServices';
import { LaboratoriesServices } from '@src/services/LaboratoriesServices';

export const makeExamController = (prisma: PrismaClient): BaseController => {
  const examsRepositories = new PrismaExamsRepositories(prisma);
  const examsServices = new ExamsServices(examsRepositories);
  const examsController = new ExamsControllers(examsServices);

  return examsController;
};

export const makeLaboratoriesController = (
  prisma: PrismaClient,
): BaseController => {
  const laboratoriesRepositories = new PrismaLaboratoriesRepositories(prisma);
  const laboratoriesServices = new LaboratoriesServices(
    laboratoriesRepositories,
  );
  const laboratoriesController = new LaboratoriesControllers(
    laboratoriesServices,
  );

  return laboratoriesController;
};

export const makeControllers = (prisma: PrismaClient): BaseController[] => {
  return [makeLaboratoriesController(prisma), makeExamController(prisma)];
};
