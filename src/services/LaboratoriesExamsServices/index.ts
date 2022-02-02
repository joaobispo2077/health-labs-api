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

  async findById(id: string): Promise<LaboratoryExam | null> {
    const laboratoryExam = await this.laboratoriesExamsRepositories.findById(
      id,
    );

    return laboratoryExam;
  }

  async dissociateLaboratoryExam(id: string): Promise<LaboratoryExam> {
    const thisLaboratoryExamExists = await this.findById(id);

    if (!thisLaboratoryExamExists) {
      throw new NotFoundError(`LaboratoryExam with id ${id} not found`);
    }

    const laboratoryExam = await this.laboratoriesExamsRepositories.deleteById(
      id,
    );

    return laboratoryExam;
  }
}
