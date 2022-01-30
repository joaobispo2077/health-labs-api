import { Laboratory } from '@src/entities/Laboratory';
import { CreateLaboratoryDTO } from '@src/services/LaboratoriesServices/dtos';

export interface LaboratoriesRepositories {
  create({ name, address, status }: CreateLaboratoryDTO): Promise<Laboratory>;
}
