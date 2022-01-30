import { Laboratory } from '@src/entities/Laboratory';
import { LaboratoriesRepositories } from '@src/repositories/LaboratoriesRepositories';
import { CreateLaboratoryDTO } from '@src/services/LaboratoriesServices/dtos';
import crypto from 'crypto';

export class FakeLaboratoriesRepositories implements LaboratoriesRepositories {
  private readonly laboratories: Laboratory[] = [];

  async create({
    name,
    address,
    status,
  }: CreateLaboratoryDTO): Promise<Laboratory> {
    const newLaboratory = {
      id: crypto.randomUUID(),
      name,
      address,
      status,
    };

    this.laboratories.push(newLaboratory);
    return newLaboratory;
  }
}
