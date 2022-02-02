import { PrismaClient } from '@prisma/client';

import { LaboratoriesRepositories } from '../LaboratoriesRepositories';

import {
  CreateLaboratoryDTO,
  UpdateLaboratoryDTO,
} from '@src/dtos/LaboratoriesDTOS';
import { Laboratory, LaboratoryStatus } from '@src/entities/Laboratory';

export class PrismaLaboratoriesRepositories
  implements LaboratoriesRepositories
{
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Laboratory | null> {
    const laboratory = await this.prisma.laboratory.findUnique({
      where: {
        id,
      },
    });

    return laboratory as Laboratory | null;
  }

  async findAll(): Promise<Laboratory[]> {
    const laboratories = await this.prisma.laboratory.findMany({
      where: {
        status: LaboratoryStatus.ACTIVE,
      },
    });

    return laboratories as Laboratory[];
  }

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

  async deleteById(id: string): Promise<Laboratory> {
    const removedLaboratoy = await this.prisma.laboratory.delete({
      where: {
        id,
      },
    });

    return removedLaboratoy as Laboratory;
  }

  async updateById({
    id,
    name,
    address,
    status,
  }: UpdateLaboratoryDTO): Promise<Laboratory> {
    const laboratory = await this.prisma.laboratory.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        status,
      },
    });

    return laboratory as Laboratory;
  }
}
