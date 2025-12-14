import { InjectRepository } from '@nestjs/typeorm';
import { Infrastructure } from './infrastructure.entity';
import { Repository } from 'typeorm';
import { InfrastructureCreateDTO } from './dtos/infrastructure-create.dto';
import { InfrastructureUpdateDTO } from './dtos/infrastructure-update.dto';
import { NotFoundException } from '@nestjs/common';
import { CommunityRepository } from 'src/community/community.repository';

export class InfrastructureRepository {
  constructor(
    @InjectRepository(Infrastructure)
    private readonly infrastructureRepository: Repository<Infrastructure>,
    private readonly communityRepo: CommunityRepository,
  ) {}

  async findAllInfrastructures(): Promise<Infrastructure[]> {
    return this.infrastructureRepository.find();
  }

  async findInfrastructureByCommunityId(id: number): Promise<Infrastructure[]> {
    return this.infrastructureRepository.find({ where: { id: id } });
  }

  async findInfrastructureById(id: number): Promise<Infrastructure | null> {
    const infrastructure = await this.infrastructureRepository.findOne({
      where: { id },
    });

    return infrastructure;
  }

  async createInfrastucture(
    infrastructure: InfrastructureCreateDTO,
  ): Promise<Infrastructure> {
    const community = await this.communityRepo.findById(
      infrastructure.communityId,
    );

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    const newInfrastructure = this.infrastructureRepository.create({
      ...infrastructure,
      community,
    });

    return await this.infrastructureRepository.save(newInfrastructure);
  }

  async saveInfrastructure(
    infrastructure: Infrastructure,
  ): Promise<Infrastructure> {
    return this.infrastructureRepository.save(infrastructure);
  }

  async updateInfrastructure(
    id: number,
    updatedInfrastructure: InfrastructureUpdateDTO,
  ): Promise<Infrastructure | null> {
    const infrastructure = await this.infrastructureRepository.findOne({
      where: { id },
    });

    if (!infrastructure) {
      throw new NotFoundException('Infrastructure not found');
    }

    await this.infrastructureRepository.update(id, updatedInfrastructure);

    return await this.infrastructureRepository.findOne({ where: { id } });
  }

  async deleteInfrastructure(id: number): Promise<void> {
    await this.infrastructureRepository.delete(id);
  }
}
