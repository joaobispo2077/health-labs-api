import { CreateExamDTO } from '@src/dtos/ExamsDTOS';
import { Exam, ExamStatus } from '@src/entities/Exam';
import { ExamsRepositories } from '@src/repositories/ExamsRepositories';
import { MakePartial } from '@src/utils/generics/MakePartial';
import { logger } from '@src/utils/logger';

export class ExamsServices {
  constructor(private examsRepositories: ExamsRepositories) {}

  async create({
    name,
    type,
    status = ExamStatus.ACTIVE,
  }: MakePartial<CreateExamDTO, 'status'>): Promise<Exam> {
    const newLaboratory = await this.examsRepositories.create({
      name,
      type,
      status,
    });

    logger.debug(`Exam created: ${newLaboratory}`);

    return newLaboratory;
  }

  async findAll(): Promise<Exam[]> {
    return await this.examsRepositories.findAll();
  }
}
