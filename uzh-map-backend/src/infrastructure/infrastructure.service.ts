import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from './infrastructure.repository';
import { Infrastructure } from './infrastructure.entity';
import { InfrastructureCreateDTO } from './dtos/infrastructure-create.dto';
import { InfrastructureUpdateDTO } from './dtos/infrastructure-update.dto';

@Injectable()
export class InfrastructureService {
  constructor(
    private readonly infrastructureRepository: InfrastructureRepository,
  ) {}

  async getAllInfrastructures(): Promise<Infrastructure[]> {
    return this.infrastructureRepository.findAllInfrastructures();
  }

  async getInfrastructureById(id: number): Promise<Infrastructure | null> {
    return this.infrastructureRepository.findInfrastructureById(id);
  }

  async getInfrastructureByCommunityId(id: number): Promise<Infrastructure[]> {
    return this.infrastructureRepository.findInfrastructureByCommunityId(id);
  }

  async createInfrastructure(
    infrastructure: InfrastructureCreateDTO,
  ): Promise<Infrastructure> {
    return this.infrastructureRepository.createInfrastucture(infrastructure);
  }

  async updateInfrastructure(
    id: number,
    updatedInfrastructure: InfrastructureUpdateDTO,
  ): Promise<Infrastructure | null> {
    return this.infrastructureRepository.updateInfrastructure(
      id,
      updatedInfrastructure,
    );
  }

  async deleteInfrastructure(id: number): Promise<void> {
    return this.infrastructureRepository.deleteInfrastructure(id);
  }
}
