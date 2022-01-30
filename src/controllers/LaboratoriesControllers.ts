import { Controller, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { LaboratoriesServices } from '@src/services/LaboratoriesServices';
import { CreateLaboratoryValidator } from '@src/utils/validations/CreateLaboratoryValidator';

@Controller('laboratories')
export class LaboratoriesControllers {
  constructor(private readonly laboratoriesServices: LaboratoriesServices) {}

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
