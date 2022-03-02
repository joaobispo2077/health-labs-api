import { Controller, Delete, Get, Patch, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { PaginateOptionsDTO } from '@src/dtos/PaginateOptionsDTO';
import { ExamsServices } from '@src/services/ExamsServices';
import { UnprocessableEntityError } from '@src/utils/errors/UnprocessableEntityError';
import { logger } from '@src/utils/logger';
import { CreateExamValidator } from '@src/utils/validations/CreateExamValidator';
import { UpdateExamValidator } from '@src/utils/validations/UpdateExamValidator';

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

  @Get(':id')
  findById: RequestHandler = async (request, response) => {
    const { id } = request.params;

    const exam = await this.examsServices.findById(String(id));

    return response.json(exam);
  };

  @Get('')
  findAll: RequestHandler = async (request, response) => {
    logger.debug(`Params found: ${JSON.stringify(request.query)}`);
    const { range, sort, filter } = request.query;

    const {
      items: exams,
      count,
      skip = 0,
      take = 0,
    } = await this.examsServices.findAll({
      range,
      sort,
      filter,
    } as PaginateOptionsDTO);
    logger.debug(`Exams found: ${exams}`);

    const contentRange = `exams ${skip}-${take + skip}/${count}`;
    response.setHeader('Content-Range', contentRange);
    response.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    return response.json(exams);
  };

  @Delete(':id')
  deleteById: RequestHandler = async (request, response) => {
    const { id } = request.params;

    if (!id) {
      throw new UnprocessableEntityError('Exam id is required to this action.');
    }

    const laboratory = await this.examsServices.deleteById(String(id));

    logger.debug(`Exam deleted: ${laboratory}`);
    return response.json(laboratory);
  };

  @Patch(':id')
  updateById: RequestHandler = async (request, response) => {
    await UpdateExamValidator.validate(request.body, {
      abortEarly: false,
    });

    const { id } = request.params;

    if (!id) {
      throw new UnprocessableEntityError('Exam id is required to this action.');
    }

    const { name, type, status } = request.body;

    const updatedExam = await this.examsServices.updateById({
      id: String(id),
      name,
      type,
      status,
    });

    logger.debug(`Exam updated: ${updatedExam}`);
    return response.json(updatedExam);
  };
}
