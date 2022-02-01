import { Controller, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { ExamsServices } from '@src/services/ExamsServices';
import { logger } from '@src/utils/logger';
import { CreateExamValidator } from '@src/utils/validations/CreateExamValidator';

@Controller('exams')
export class ExamsControllers extends BaseController {
  constructor(private readonly examsServices: ExamsServices) {
    super();
  }

  @Post('')
  create: RequestHandler = async (request, response) => {
    await CreateExamValidator.validate(request.body, {
      abortEarly: false,
    });

    const { name, type } = request.body;

    const newExam = await this.examsServices.create({
      name,
      type,
    });

    logger.debug(`Exam created: ${newExam.id}`);
    return response.status(201).json(newExam);
  };
}
