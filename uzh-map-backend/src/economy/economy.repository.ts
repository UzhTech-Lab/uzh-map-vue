import { InjectRepository } from '@nestjs/typeorm';
import { Economy } from './economy.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { EconomyUpdateDTO } from './dtos/economy-update.dto';
import { EconomyCreateDTO } from './dtos/economy-create.dto';
import { CommunityRepository } from 'src/community/community.repository';

export class EconomyRepository {
  constructor(
    @InjectRepository(Economy)
    private readonly economyRepository: Repository<Economy>,
    private readonly communityRepo: CommunityRepository,
  ) {}

  async findAllEconomy(): Promise<Economy[]> {
    return this.economyRepository.find();
  }

  async findEconomyByCommunityId(id: number): Promise<Economy[]> {
    return this.economyRepository.find({ where: { id: id } });
  }

  async findEconomyById(id: number): Promise<Economy | null> {
    const economy = await this.economyRepository.findOne({
      where: { id },
    });

    return economy;
  }

  async createEconomy(economy: EconomyCreateDTO): Promise<Economy> {
    const community = await this.communityRepo.findById(economy.communityId);

    if (!community) {
      throw new NotFoundException('Community not found');
    }
    this.economyRepository.create({ ...economy, community: community });

    return this.economyRepository.save(economy);
  }

  async saveEconomy(economy: Economy): Promise<Economy> {
    return this.economyRepository.save(economy);
  }

  async updateEconomy(
    id: number,
    updateEconomy: EconomyUpdateDTO,
  ): Promise<Economy | null> {
    const economy = await this.economyRepository.findOne({
      where: { id },
    });

    if (!economy) {
      throw new NotFoundException(`Economy with ID ${id} not found`);
    }

    await this.economyRepository.update(id, updateEconomy);

    return await this.economyRepository.findOne({ where: { id } });
  }

  async deleteEconomy(id: number): Promise<void> {
    await this.economyRepository.delete(id);
  }
}
