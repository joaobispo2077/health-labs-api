import { ExamStatus, ExamType } from '@src/entities/Exam';

export interface CreateExamDTO {
  name: string;
  type: ExamType;
  status: ExamStatus;
}
export interface UpdateExamDTO {
  id: string;
  name?: string;
  type?: ExamType;
  status?: ExamStatus;
}

export interface UpdateManyExamsDTO {
  idList: string[];
  data: Omit<UpdateExamDTO, 'id'>;
}
