import { InjectRepository } from '@nestjs/typeorm';
import { Geography } from './geography.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GeographyCreateDTO } from './dtos/geography-create.dto';
import { GeographyUpdateDTO } from './dtos/geography-update.dto';
import { CommunityRepository } from 'src/community/community.repository';

@Injectable()
export class GeographyRepository {
  constructor(
    @InjectRepository(Geography)
    private readonly geographyReposity: Repository<Geography>,
    private readonly communityRepo: CommunityRepository,
  ) {}

  async findAllGeography(): Promise<Geography[]> {
    return this.geographyReposity.find();
  }

  async findById(id: number): Promise<Geography | null> {
    const geography = await this.geographyReposity.findOne({ where: { id } });

    if (!geography) {
      throw new NotFoundException('The geography not found');
    }

    return geography;
  }

  async findByCommunityId(id: number): Promise<Geography[]> {
    return this.geographyReposity.find({ where: { community: { id } } });
  }

  async createGeography(geography: GeographyCreateDTO): Promise<Geography> {
    const community = await this.communityRepo.findById(geography.communityId);

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    const newGeography = this.geographyReposity.create({
      name: geography.name,
      category: geography.category,
      community,
    });

    return await this.geographyReposity.save(newGeography);
  }

  async saveGeography(geography: Geography): Promise<Geography> {
    return this.geographyReposity.save(geography);
  }

  async updateGeography(
    id: number,
    geography: GeographyUpdateDTO,
  ): Promise<Geography | null> {
    const newGeography = await this.geographyReposity.findOne({
      where: { id },
    });

    if (!newGeography) {
      throw new NotFoundException(`Geography not found`);
    }

    await this.geographyReposity.update(id, geography);

    return await this.geographyReposity.findOne({ where: { id } });
  }

  async deleteGeography(id: number): Promise<void> {
    await this.geographyReposity.delete(id);
  }
}
