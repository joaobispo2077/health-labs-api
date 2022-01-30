export enum LaboratoryStatus {
  ACTIVE = 'ativo',
  INACTIVE = 'inativo',
}

export interface Laboratory {
  id: string;
  name: string;
  address: string;
  status: LaboratoryStatus;
}
