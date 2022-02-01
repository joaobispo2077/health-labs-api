import { CreateExamDTO } from '@src/dtos/ExamsDTOS';
import { Exam } from '@src/entities/Exam';

export interface ExamsRepositories {
  create({ name, type, status }: CreateExamDTO): Promise<Exam>;
}
