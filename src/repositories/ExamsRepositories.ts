import {
  CreateExamDTO,
  UpdateExamDTO,
  UpdateManyExamsDTO,
} from '@src/dtos/ExamsDTOS';
import { PaginateOptionsDTO } from '@src/dtos/PaginateOptionsDTO';
import { Exam } from '@src/entities/Exam';

export type ExamsFindAllResult = {
  items: Exam[];
  count: number;
  skip?: number;
  take?: number;
};
export interface ExamsRepositories {
  create({ name, type, status }: CreateExamDTO): Promise<Exam>;
  findAll(paginationOptions?: PaginateOptionsDTO): Promise<ExamsFindAllResult>;
  deleteById(id: string): Promise<Exam>;
  findById(id: string): Promise<Exam | null>;
  updateById({ id, name, type, status }: UpdateExamDTO): Promise<Exam>;
  createMany(exams: CreateExamDTO[]): Promise<number>;
  deleteMany(ids: string[]): Promise<number>;
  updateMany({ idList, data }: UpdateManyExamsDTO): Promise<number>;
}
