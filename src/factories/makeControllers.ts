import { PrismaClient } from '@prisma/client';

import { BaseController } from '@src/controllers';
import { LaboratoriesControllers } from '@src/controllers/LaboratoriesControllers';
import { PrismaLaboratoriesRepositories } from '@src/repositories/implementations/PrismaLaboratoriesRepositories';
import { LaboratoriesServices } from '@src/services/LaboratoriesServices';

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
  return [makeLaboratoriesController(prisma)];
};
