import {
  CreateLaboratoryDTO,
  UpdateLaboratoryDTO,
} from '@src/dtos/LaboratoriesDTOS';
import { Laboratory } from '@src/entities/Laboratory';

export interface LaboratoriesRepositories {
  create({ name, address, status }: CreateLaboratoryDTO): Promise<Laboratory>;
  findAll(): Promise<Laboratory[]>;
  deleteById(id: string): Promise<Laboratory>;
  findById(id: string): Promise<Laboratory | null>;
  updateById({
    id,
    name,
    address,
    status,
  }: UpdateLaboratoryDTO): Promise<Laboratory>;
}
