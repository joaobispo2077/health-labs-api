import { AssociateLaboratoryExamDTO } from '@src/dtos/LaboratoriesExamsDTOS';
import { LaboratoryExam } from '@src/entities/LaboratoryExam';

export interface LaboratoriesExamsRepositories {
  create({
    laboratoryId,
    examId,
  }: AssociateLaboratoryExamDTO): Promise<LaboratoryExam>;
  deleteById(id: string): Promise<LaboratoryExam>;
}
