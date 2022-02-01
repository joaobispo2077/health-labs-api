export enum ExamStatus {
  ACTIVE = 'ativo',
  INACTIVE = 'inativo',
}

export enum ExamType {
  ANALYSIS = 'analise clinica',
  IMAGE = 'imagem',
}

export interface Exam {
  id: string;
  name: string;
  type: ExamType;
  status: ExamStatus;
}
