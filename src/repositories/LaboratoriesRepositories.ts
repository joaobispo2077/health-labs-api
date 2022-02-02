import { CreateLaboratoryDTO } from '@src/dtos/LaboratoriesDTOS';
import { Laboratory } from '@src/entities/Laboratory';

export interface LaboratoriesRepositories {
  create({ name, address, status }: CreateLaboratoryDTO): Promise<Laboratory>;
  findAll(): Promise<Laboratory[]>;
  deleteById(id: string): Promise<Laboratory>;
}
