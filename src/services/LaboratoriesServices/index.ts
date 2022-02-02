import { CreateLaboratoryDTO } from '@src/dtos/LaboratoriesDTOS';
import { Laboratory, LaboratoryStatus } from '@src/entities/Laboratory';
import { LaboratoriesRepositories } from '@src/repositories/LaboratoriesRepositories';
import { NotFoundError } from '@src/utils/errors/NotFoundError';
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

  async findById(id: string): Promise<Laboratory | null> {
    const laboratory = await this.laboratoriesRepositories.findById(id);

    return laboratory;
  }

  async deleteById(id: string): Promise<Laboratory> {
    const thisLaboratoryExists = await this.findById(id);

    if (!thisLaboratoryExists) {
      throw new NotFoundError('Laboratory not found.');
    }

    const removedLaboratoy = await this.laboratoriesRepositories.deleteById(id);
    return removedLaboratoy;
  }
}
