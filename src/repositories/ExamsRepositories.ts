import { CreateExamDTO, UpdateExamDTO } from '@src/dtos/ExamsDTOS';
import { Exam } from '@src/entities/Exam';

export interface ExamsRepositories {
  create({ name, type, status }: CreateExamDTO): Promise<Exam>;
  findAll(): Promise<Exam[]>;
  deleteById(id: string): Promise<Exam>;
  findById(id: string): Promise<Exam | null>;
  updateById({ id, name, type, status }: UpdateExamDTO): Promise<Exam>;
}
