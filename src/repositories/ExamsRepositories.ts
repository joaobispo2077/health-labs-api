import { Prisma } from '@prisma/client';

import {
  CreateExamDTO,
  UpdateExamDTO,
  UpdateManyExamsDTO,
} from '@src/dtos/ExamsDTOS';
import { Exam } from '@src/entities/Exam';

export type ExamsPaginateOptions = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ExamWhereUniqueInput;
  where?: Prisma.ExamWhereInput;
  orderBy?: Prisma.ExamOrderByWithRelationInput;
};

export type ExamsFindAllResult = {
  items: Exam[];
  count: number;
};
export interface ExamsRepositories {
  create({ name, type, status }: CreateExamDTO): Promise<Exam>;
  findAll(options: ExamsPaginateOptions): Promise<ExamsFindAllResult>;
  deleteById(id: string): Promise<Exam>;
  findById(id: string): Promise<Exam | null>;
  updateById({ id, name, type, status }: UpdateExamDTO): Promise<Exam>;
  createMany(exams: CreateExamDTO[]): Promise<number>;
  deleteMany(ids: string[]): Promise<number>;
  updateMany({ idList, data }: UpdateManyExamsDTO): Promise<number>;
}
