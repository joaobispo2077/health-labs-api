import { ExamStatus, ExamType } from '@src/entities/Exam';

export interface CreateExamDTO {
  name: string;
  type: ExamType;
  status: ExamStatus;
}
