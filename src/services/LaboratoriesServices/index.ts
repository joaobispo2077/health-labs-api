import { CreateLaboratoryDTO } from '@src/dtos/LaboratoriesDTOS';
import { Laboratory, LaboratoryStatus } from '@src/entities/Laboratory';
import { LaboratoriesRepositories } from '@src/repositories/LaboratoriesRepositories';
import { MakePartial } from '@src/utils/generics/MakePartial';
import { logger } from '@src/utils/logger';

export class LaboratoriesServices {
  constructor(private laboratoriesRepositories: LaboratoriesRepositories) {}

  async create({
    name,
    address,
  }: MakePartial<CreateLaboratoryDTO, 'status'>): Promise<Laboratory> {
    const newLaboratory = await this.laboratoriesRepositories.create({
      name,
      address,
      status: LaboratoryStatus.ACTIVE,
    });

    logger.debug(`Laboratory created: ${newLaboratory}`);

    return newLaboratory;
  }

  async findAll(): Promise<Laboratory[]> {
    return await this.laboratoriesRepositories.findAll();
  }

  async deleteById(id: string): Promise<Laboratory> {
    return await this.laboratoriesRepositories.deleteById(id);
  }
}
