import { CreateExamDTO, UpdateExamDTO } from '@src/dtos/ExamsDTOS';
import { Exam, ExamStatus } from '@src/entities/Exam';
import { ExamsRepositories } from '@src/repositories/ExamsRepositories';
import { NotFoundError } from '@src/utils/errors/NotFoundError';
import { MakePartial } from '@src/utils/generics/MakePartial';
import { logger } from '@src/utils/logger';

export class ExamsServices {
  constructor(private examsRepositories: ExamsRepositories) {}

  async createMany(exams: CreateExamDTO[]): Promise<number> {
    const examsWithDefaultStatus = exams.map((exam) => ({
      ...exam,
      status: ExamStatus.ACTIVE,
    }));

    const createdExams = await this.examsRepositories.createMany(
      examsWithDefaultStatus,
    );

    return createdExams;
  }

  async create({
    name,
    type,
    status = ExamStatus.ACTIVE,
  }: MakePartial<CreateExamDTO, 'status'>): Promise<Exam> {
    const newExam = await this.examsRepositories.create({
      name,
      type,
      status,
    });

    logger.debug(`Exam created: ${newExam}`);

    return newExam;
  }

  async findAll(): Promise<Exam[]> {
    return await this.examsRepositories.findAll();
  }

  async findById(id: string): Promise<Exam | null> {
    const exam = await this.examsRepositories.findById(id);

    return exam;
  }

  async deleteById(id: string): Promise<Exam> {
    const thisExamExists = await this.findById(id);

    if (!thisExamExists) {
      throw new NotFoundError('Exam not found.');
    }

    const removedExam = await this.examsRepositories.deleteById(id);
    return removedExam;
  }

  async updateById({ id, name, type, status }: UpdateExamDTO): Promise<Exam> {
    const thisExamExists = await this.findById(id);

    if (!thisExamExists) {
      throw new NotFoundError('Exam not found.');
    }

    const updatedExam = await this.examsRepositories.updateById({
      id,
      name,
      type,
      status,
    });

    return updatedExam;
  }
}
