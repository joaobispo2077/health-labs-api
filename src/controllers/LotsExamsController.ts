import { Controller, Delete, Patch, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { ExamsServices } from '@src/services/ExamsServices';
import { logger } from '@src/utils/logger';
import { CreateManyExamsValidator } from '@src/utils/validations/CreateManyExamsValidator';
import { DeleteManyExamsValidator } from '@src/utils/validations/DeleteManyExamsValidator';
import { UpdateManyExamsValidator } from '@src/utils/validations/UpdateManyExamsValidator';

@Controller('lots/exams')
export class LotsExamsController extends BaseController {
  constructor(private readonly examsServices: ExamsServices) {
    super();
  }

  @Post('')
  create: RequestHandler = async (request, response) => {
    logger.info('LotsExamsController.create()');
    logger.debug('request:', request.body);
    await CreateManyExamsValidator.validate(request.body, {
      abortEarly: false,
    });

    const validatedExams = request.body;

    const createdExamsNumber = await this.examsServices.createMany(
      validatedExams,
    );

    logger.debug(`Created ${createdExamsNumber} exams.`);

    return response
      .status(201)
      .json({ message: `Created with success ${createdExamsNumber} exams.` });
  };

  @Delete('')
  delete: RequestHandler = async (request, response) => {
    logger.info('LotsExamsController.delete()');
    logger.debug('request:', request.body);

    await DeleteManyExamsValidator.validate(request.body, {
      abortEarly: false,
    });

    const idList = request.body as string[];
    logger.debug('idList validated %s', idList);

    const removedExamQuantity = await this.examsServices.deleteMany(idList);

    return response.json({
      message: `Deleted with success ${removedExamQuantity} exams.`,
    });
  };

  @Patch('')
  update: RequestHandler = async (request, response) => {
    logger.info('LotsExamsController.update()');
    logger.debug('request:', request.body);

    await UpdateManyExamsValidator.validate(request.body, {
      abortEarly: false,
    });

    const exams = request.body;

    const updatedExamsQuantity = await this.examsServices.updateMany(exams);

    return response.json({
      message: `Updated with success ${updatedExamsQuantity} exams.`,
    });
  };
}
