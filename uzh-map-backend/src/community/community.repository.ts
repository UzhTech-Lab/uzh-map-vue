import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Community } from './community.entity';
import { CommunityCreateDTO } from './dtos/community-create.dto';
import { CommunityUpdateDTO } from './dtos/community-update.dto';

@Injectable()
export class CommunityRepository {
  constructor(
    @InjectRepository(Community)
    private readonly repo: Repository<Community>,
  ) {}

  findAll(): Promise<Community[]> {
    return this.repo.find({
      relations: {
        geography: true,
        population: true,
        economy: true,
        infrastructure: true,
        argiculture_places: true,
        education_places: true,
      },
    });
  }

  find(): Promise<Community[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Community> {
    const community = await this.repo.findOne({
      where: { id },
      relations: [
        'geography',
        'population',
        'economy',
        'infrastructure',
        'argiculture_places',
        'education_places',
      ],
    });
    if (!community) throw new NotFoundException('Community not found');
    return community;
  }

  async createCommunity(dto: CommunityCreateDTO): Promise<Community> {
    const community = this.repo.create(dto);
    return this.repo.save(community);
  }

  async updateCommunity(
    id: number,
    dto: CommunityUpdateDTO,
  ): Promise<Community> {
    const community = await this.repo.preload({ id, ...dto });
    if (!community) throw new NotFoundException('Community not found');
    return this.repo.save(community);
  }

  async deleteCommunity(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Community not found');
  }
}
