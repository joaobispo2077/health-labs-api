import { Controller, Delete, Get, Patch, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { LaboratoriesServices } from '@src/services/LaboratoriesServices';
import { UnprocessableEntityError } from '@src/utils/errors/UnprocessableEntityError';
import { logger } from '@src/utils/logger';
import { CreateLaboratoryValidator } from '@src/utils/validations/CreateLaboratoryValidator';
import { UpdateLaboratoryValidator } from '@src/utils/validations/UpdateLaboratoryValidator';

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
}
