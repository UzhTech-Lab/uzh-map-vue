import { Injectable } from '@nestjs/common';
import { AgricultureRepository } from './agriculture.repository';
import { Agriculture } from './agriculture.entity';
import { AgricultureCreateDTO } from './dtos/argiculture-create.dto';
import { AgricultureUpdateDTO } from './dtos/argiculture-update.dto';

@Injectable()
export class AgricultureService {
  constructor(private readonly agricultureRepository: AgricultureRepository) {}

  async getArgicultureByCommunityId(id: number): Promise<Agriculture[]> {
    return await this.agricultureRepository.findAgriculturesByCommunityId(id);
  }

  async getArgicultureById(id: number): Promise<Agriculture | null> {
    return await this.agricultureRepository.findAgricultureById(id);
  }

  async getAllAgricultures(): Promise<Agriculture[]> {
    return this.agricultureRepository.findAllAgricultures();
  }

  async createArgiculture(
    argiculture: AgricultureCreateDTO,
  ): Promise<Agriculture> {
    return this.agricultureRepository.createAgriculture(argiculture);
  }

  async updateAgriculture(
    id: number,
    argiculture: AgricultureUpdateDTO,
  ): Promise<Agriculture | null> {
    return this.agricultureRepository.updateAgriculture(id, argiculture);
  }

  async deleteArgiculture(id: number): Promise<void> {
    return this.agricultureRepository.deleteArgiculture(id);
  }
}
