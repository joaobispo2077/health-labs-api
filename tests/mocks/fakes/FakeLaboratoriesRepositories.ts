/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateLaboratoryDTO,
  UpdateLaboratoryDTO,
} from '@src/dtos/LaboratoriesDTOS';
import { Laboratory } from '@src/entities/Laboratory';
import { LaboratoriesRepositories } from '@src/repositories/LaboratoriesRepositories';
import crypto from 'crypto';

export class FakeLaboratoriesRepositories implements LaboratoriesRepositories {
  private readonly laboratories: Laboratory[] = [];

  async create({
    name,
    address,
    status,
  }: CreateLaboratoryDTO): Promise<Laboratory> {
    const newLaboratory = {
      id: crypto.randomUUID(),
      name,
      address,
      status,
    };

    this.laboratories.push(newLaboratory);
    return newLaboratory;
  }

  findAll(): Promise<Laboratory[]> {
    throw new Error('Method not implemented.');
  }

  deleteById(id: string): Promise<Laboratory> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Laboratory | null> {
    throw new Error('Method not implemented.');
  }

  updateById({
    id,
    name,
    address,
    status,
  }: UpdateLaboratoryDTO): Promise<Laboratory> {
    throw new Error('Method not implemented.');
  }
}
