import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agriculture } from './agriculture.entity';
import { Repository } from 'typeorm';
import { AgricultureCreateDTO } from './dtos/argiculture-create.dto';
import { AgricultureUpdateDTO } from './dtos/argiculture-update.dto';
import { CommunityRepository } from 'src/community/community.repository';

@Injectable()
export class AgricultureRepository {
  constructor(
    @InjectRepository(Agriculture)
    private readonly agricultureRepository: Repository<Agriculture>,
    private readonly communityRepo: CommunityRepository,
  ) {}

  async findAllAgricultures(): Promise<Agriculture[]> {
    return this.agricultureRepository.find();
  }

  async findAgriculturesByCommunityId(id: number): Promise<Agriculture[]> {
    return this.agricultureRepository.find({ where: { id: id } });
  }

  async findAgricultureById(id: number): Promise<Agriculture | null> {
    const argiculture = await this.agricultureRepository.findOne({
      where: { id: id },
    });

    return argiculture;
  }

  async createAgriculture(
    argiculture: AgricultureCreateDTO,
  ): Promise<Agriculture> {
    const community = await this.communityRepo.findById(
      argiculture.communityId,
    );

    if (!community) {
      throw new NotFoundException('Community not found');
    }
    this.agricultureRepository.create(argiculture);
    argiculture.communityId = community.id;
    return this.agricultureRepository.save(argiculture);
  }

  async saveArgiculture(argiculture: Agriculture): Promise<Agriculture> {
    return this.agricultureRepository.save(argiculture);
  }

  async updateAgriculture(
    id: number,
    updateArgiculture: AgricultureUpdateDTO,
  ): Promise<Agriculture | null> {
    const argiculture = await this.findAgricultureById(id);

    if (!argiculture) {
      throw new NotFoundException(`Argiculture with ID ${id} not found`);
    }

    await this.agricultureRepository.update(id, updateArgiculture);
    return await this.agricultureRepository.findOne({ where: { id: id } });
  }

  async deleteArgiculture(id: number): Promise<void> {
    await this.agricultureRepository.delete(id);
  }
}
