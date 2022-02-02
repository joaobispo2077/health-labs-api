import { Controller, Delete, Get, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { LaboratoriesServices } from '@src/services/LaboratoriesServices';
import { UnprocessableEntityError } from '@src/utils/errors/UnprocessableEntityError';
import { logger } from '@src/utils/logger';
import { CreateLaboratoryValidator } from '@src/utils/validations/CreateLaboratoryValidator';

@Controller('laboratories')
export class LaboratoriesControllers extends BaseController {
  constructor(private readonly laboratoriesServices: LaboratoriesServices) {
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
    return response.status(200).json(laboratories);
  };

  @Delete(':id')
  deleteById: RequestHandler = async (request, response) => {
    const { id } = request.params;

    if (!id) {
      throw new UnprocessableEntityError('Exam id is required to this action.');
    }

    const laboratory = await this.laboratoriesServices.deleteById(String(id));

    logger.debug(`Laboratory deleted: ${laboratory}`);
    return response.status(200).json(laboratory);
  };
}
