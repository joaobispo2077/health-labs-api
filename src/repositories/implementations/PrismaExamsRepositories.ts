import { PrismaClient } from '@prisma/client';

import { ExamsRepositories } from '../ExamsRepositories';

import { CreateExamDTO } from '@src/dtos/ExamsDTOS';
import { Exam, ExamStatus, ExamType } from '@src/entities/Exam';

export class PrismaExamsRepositories implements ExamsRepositories {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ name, type, status }: CreateExamDTO): Promise<Exam> {
    const newExam = await this.prisma.exam.create({
      data: {
        name,
        type,
        status,
      },
    });

    return {
      ...newExam,
      type: newExam.type as ExamType,
      status: newExam.status as ExamStatus,
    };
  }
}
