import { CreateLaboratoryDTO } from '@src/dtos/LaboratoriesDTOS';
import { Laboratory } from '@src/entities/Laboratory';
import { LaboratoriesRepositories } from '@src/repositories/LaboratoriesRepositories';

export class LaboratoriesServices {
  constructor(private LaboratoriesRepositories: LaboratoriesRepositories) {}

  async create({
    name,
    address,
    status,
  }: CreateLaboratoryDTO): Promise<Laboratory> {
    const newLaboratory = await this.LaboratoriesRepositories.create({
      name,
      address,
      status,
    });

    return newLaboratory;
  }
}
