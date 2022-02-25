/* eslint-disable no-console */
import { Prisma, PrismaClient } from '@prisma/client';

import {
  ExamsFindAllResult,
  ExamsPaginateOptions,
  ExamsRepositories,
} from '../ExamsRepositories';

import {
  CreateExamDTO,
  UpdateExamDTO,
  UpdateManyExamsDTO,
} from '@src/dtos/ExamsDTOS';
import { Exam, ExamStatus, ExamType } from '@src/entities/Exam';
import { logger } from '@src/utils/logger';

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

  async findAll(options: ExamsPaginateOptions): Promise<ExamsFindAllResult> {
    const { skip, take, cursor, where, orderBy } = options;

    const [items, count] = await this.prisma.$transaction([
      this.prisma.exam.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
      this.prisma.exam.count({ where }),
    ]);

    return { count, items: items as Exam[] };
  }

  async deleteById(id: string): Promise<Exam> {
    const removedExam = await this.prisma.exam.delete({
      where: {
        id,
      },
    });

    return removedExam as Exam;
  }

  async findById(id: string): Promise<Exam | null> {
    const exam = await this.prisma.exam.findUnique({
      where: {
        id,
      },
    });

    return exam as Exam | null;
  }

  async updateById({ id, name, type, status }: UpdateExamDTO): Promise<Exam> {
    const updatedExam = await this.prisma.exam.update({
      where: {
        id,
      },
      data: {
        name,
        type,
        status,
      },
    });

    return updatedExam as Exam;
  }

  async createMany(exams: CreateExamDTO[]): Promise<number> {
    const createdExams = await this.prisma.exam.createMany({
      data: exams,
    });

    logger.info(`Created ${createdExams.count} exams.`);

    return createdExams.count;
  }

  async deleteMany(idList: string[]): Promise<number> {
    logger.debug('PrismaExamsRepositories.deleteMany()');

    const deletedExams = await this.prisma.exam.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });

    return deletedExams.count;
  }

  async updateMany({ idList, data }: UpdateManyExamsDTO): Promise<number> {
    const updatedExams = await this.prisma.exam.updateMany({
      where: {
        id: {
          in: idList,
        },
      },
      data,
    });

    logger.info(`Updated ${updatedExams.count} exams.`);

    return updatedExams.count;
  }
}
