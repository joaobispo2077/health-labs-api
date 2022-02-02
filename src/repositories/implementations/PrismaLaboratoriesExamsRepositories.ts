import { PrismaClient } from '@prisma/client';

import { LaboratoriesExamsRepositories } from '../LaboratoriesExamsRepositories';

import { AssociateLaboratoryExamDTO } from '@src/dtos/LaboratoriesExamsDTOS';
import { LaboratoryExam } from '@src/entities/LaboratoryExam';

export class PrismaLaboratoriesExamsRepositories
  implements LaboratoriesExamsRepositories
{
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<LaboratoryExam | null> {
    const laboratoryExam = await this.prisma.laboratoryExam.findUnique({
      where: {
        id,
      },
    });

    return laboratoryExam as LaboratoryExam | null;
  }

  async create({
    laboratoryId,
    examId,
  }: AssociateLaboratoryExamDTO): Promise<LaboratoryExam> {
    const laboratoryExam = await this.prisma.laboratoryExam.create({
      data: {
        laboratory: {
          connect: {
            id: laboratoryId,
          },
        },
        exam: {
          connect: {
            id: examId,
          },
        },
      },
    });

    return laboratoryExam as LaboratoryExam;
  }

  async deleteById(id: string): Promise<LaboratoryExam> {
    const laboratoryExam = await this.prisma.laboratoryExam.delete({
      where: {
        id,
      },
    });

    return laboratoryExam as LaboratoryExam;
  }
}
