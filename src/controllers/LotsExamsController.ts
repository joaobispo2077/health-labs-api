import { Controller, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { ExamsServices } from '@src/services/ExamsServices';
import { logger } from '@src/utils/logger';
import { CreateManyExamsValidator } from '@src/utils/validations/CreateManyExamsValidator';

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

    response
      .status(201)
      .json({ message: `Created with success ${createdExamsNumber} exams.` });
  };
}
