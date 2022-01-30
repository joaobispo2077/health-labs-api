import { LaboratoryStatus } from '@src/entities/Laboratory';

export interface CreateLaboratoryDTO {
  name: string;
  address: string;
  status: LaboratoryStatus;
}
