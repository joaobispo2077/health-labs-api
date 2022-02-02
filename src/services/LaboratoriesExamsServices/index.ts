import { AssociateLaboratoryExamDTO } from '@src/dtos/LaboratoriesExamsDTOS';
import { LaboratoryExam } from '@src/entities/LaboratoryExam';
import { LaboratoriesExamsRepositories } from '@src/repositories/LaboratoriesExamsRepositories';

export class LaboratoriesExamsServices {
  constructor(
    private readonly laboratoriesExamsRepositories: LaboratoriesExamsRepositories,
  ) {}

  async associateLaboratoryExam({
    laboratoryId,
    examId,
  }: AssociateLaboratoryExamDTO): Promise<LaboratoryExam> {
    const laboratoryExam = await this.laboratoriesExamsRepositories.create({
      laboratoryId,
      examId,
    });

    return laboratoryExam;
  }
}
