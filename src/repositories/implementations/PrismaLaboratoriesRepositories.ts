import { PrismaClient } from '@prisma/client';

import { LaboratoriesRepositories } from '../LaboratoriesRepositories';

import { CreateLaboratoryDTO } from '@src/dtos/LaboratoriesDTOS';
import { Laboratory, LaboratoryStatus } from '@src/entities/Laboratory';

export class PrismaLaboratoriesRepositories
  implements LaboratoriesRepositories
{
  constructor(private readonly prisma: PrismaClient) {}
  async create({
    name,
    address,
    status,
  }: CreateLaboratoryDTO): Promise<Laboratory> {
    const newLaboratory = await this.prisma.laboratory.create({
      data: {
        name,
        address,
        status,
      },
    });

    return {
      ...newLaboratory,
      status: newLaboratory.status as LaboratoryStatus,
    };
  }
}