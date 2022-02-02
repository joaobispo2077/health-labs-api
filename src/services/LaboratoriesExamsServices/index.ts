import { AssociateLaboratoryExamDTO } from '@src/dtos/LaboratoriesExamsDTOS';
import { LaboratoryExam } from '@src/entities/LaboratoryExam';
import { ExamsRepositories } from '@src/repositories/ExamsRepositories';
import { LaboratoriesExamsRepositories } from '@src/repositories/LaboratoriesExamsRepositories';
import { LaboratoriesRepositories } from '@src/repositories/LaboratoriesRepositories';
import { NotFoundError } from '@src/utils/errors/NotFoundError';

export class LaboratoriesExamsServices {
  constructor(
    private readonly laboratoriesExamsRepositories: LaboratoriesExamsRepositories,
    private readonly laboratoriesRepositories: LaboratoriesRepositories,
    private readonly examsRepositories: ExamsRepositories,
  ) {}

  async associateLaboratoryExam({
    laboratoryId,
    examId,
  }: AssociateLaboratoryExamDTO): Promise<LaboratoryExam> {
    const thisLaboratoryExists = await this.laboratoriesRepositories.findById(
      laboratoryId,
    );

    if (!thisLaboratoryExists) {
      throw new NotFoundError(`Laboratory with id ${laboratoryId} not found`);
    }

    const thisExamExists = await this.examsRepositories.findById(examId);

    if (!thisExamExists) {
      throw new NotFoundError(`Exam with id ${examId} not found`);
    }

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

  async findAllLaboratoriesThatHaveExamWithName(
    name: string,
  ): Promise<LaboratoryExam[]> {
    const laboratoryExams =
      await this.laboratoriesExamsRepositories.findAllLaboratoriesThatHaveExamWithName(
        name,
      );

    return laboratoryExams;
  }
}
