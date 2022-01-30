import { Controller, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { LaboratoriesServices } from '@src/services/LaboratoriesServices';
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

    const { name, address, status } = request.body;

    const newLaboratory = await this.laboratoriesServices.create({
      name,
      address,
      status,
    });

    return response.status(201).json(newLaboratory);
  };
}
