import { Controller, Delete, Get, Patch, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { LaboratoriesExamsServices } from '@src/services/LaboratoriesExamsServices';
import { LaboratoriesServices } from '@src/services/LaboratoriesServices';
import { UnprocessableEntityError } from '@src/utils/errors/UnprocessableEntityError';
import { logger } from '@src/utils/logger';
import { CreateLaboratoryValidator } from '@src/utils/validations/CreateLaboratoryValidator';
import { UpdateLaboratoryValidator } from '@src/utils/validations/UpdateLaboratoryValidator';

@Controller('laboratories')
export class LaboratoriesControllers extends BaseController {
  constructor(
    private readonly laboratoriesServices: LaboratoriesServices,
    private readonly laboratoriesExamsServices: LaboratoriesExamsServices,
  ) {
    super();
  }

  @Post('')
  create: RequestHandler = async (request, response) => {
    await CreateLaboratoryValidator.validate(request.body, {
      abortEarly: false,
    });

    const { name, address } = request.body;

    const newLaboratory = await this.laboratoriesServices.create({
      name,
      address,
    });

    logger.debug(`Laboratory created: ${newLaboratory.id}`);
    return response.status(201).json(newLaboratory);
  };

  @Get('')
  findAll: RequestHandler = async (request, response) => {
    const laboratories = await this.laboratoriesServices.findAll();

    logger.debug(`Laboratories found: ${laboratories}`);
    return response.json(laboratories);
  };

  @Delete(':id')
  deleteById: RequestHandler = async (request, response) => {
    const { id } = request.params;

    if (!id) {
      throw new UnprocessableEntityError(
        'Laboratory id is required to this action.',
      );
    }

    const laboratory = await this.laboratoriesServices.deleteById(String(id));

    logger.debug(`Laboratory deleted: ${laboratory}`);
    return response.json(laboratory);
  };

  @Patch(':id')
  updateById: RequestHandler = async (request, response) => {
    await UpdateLaboratoryValidator.validate(request.body, {
      abortEarly: false,
    });

    const { id } = request.params;

    if (!id) {
      throw new UnprocessableEntityError(
        'Laboratory id is required to this action.',
      );
    }

    const { name, address, status } = request.body;

    const laboratory = await this.laboratoriesServices.updateById({
      id: String(id),
      name,
      address,
      status,
    });

    logger.debug(`Laboratory updated: ${laboratory}`);
    return response.json(laboratory);
  };

  @Post(':laboratoryId/exams')
  associateExam: RequestHandler = async (request, response) => {
    const { laboratoryId } = request.params;

    if (!laboratoryId) {
      throw new UnprocessableEntityError(
        'Laboratory id in route params is required to this action.',
      );
    }

    const { examId } = request.body;

    if (!examId) {
      throw new UnprocessableEntityError(
        'Exam id in request body is required to this action.',
      );
    }

    const laboratoryExam =
      await this.laboratoriesExamsServices.associateLaboratoryExam({
        laboratoryId: String(laboratoryId),
        examId: String(examId),
      });

    logger.debug(`Laboratory exam associated: ${laboratoryExam}`);
    return response.json(laboratoryExam);
  };

  @Delete(':laboratoryId/exams/:relationId')
  dissociateExam: RequestHandler = async (request, response) => {
    const { laboratoryId, relationId } = request.params;

    if (!laboratoryId || !relationId) {
      throw new UnprocessableEntityError(
        'Laboratory id and relation id (with exam) in route params are required to this action.',
      );
    }

    const laboratoryExam =
      await this.laboratoriesExamsServices.dissociateLaboratoryExam(relationId);

    logger.debug(`Laboratory exam dissociated: ${laboratoryExam}`);
    return response.json(laboratoryExam);
  };
}
