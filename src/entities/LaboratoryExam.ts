import { Exam } from './Exam';
import { Laboratory } from './Laboratory';

export interface LaboratoryExam {
  id: string;
  laboratoryId?: string;
  examId: string;

  exam?: Exam;
  laboratory?: Laboratory;
}
