import { Injectable } from '@nestjs/common';
import { EconomyRepository } from './economy.repository';
import { Economy } from './economy.entity';
import { EconomyCreateDTO } from './dtos/economy-create.dto';
import { EconomyUpdateDTO } from './dtos/economy-update.dto';

@Injectable()
export class EconomyService {
  constructor(private readonly economyRepository: EconomyRepository) {}

  async getAllEconomy(): Promise<Economy[]> {
    return this.economyRepository.findAllEconomy();
  }

  async getEconomyById(id: number): Promise<Economy | null> {
    return this.economyRepository.findEconomyById(id);
  }

  async getEconomyByCommunityId(id: number): Promise<Economy[]> {
    return this.economyRepository.findEconomyByCommunityId(id);
  }

  async createEconomy(economy: EconomyCreateDTO): Promise<Economy> {
    return this.economyRepository.createEconomy(economy);
  }

  async updateEconomy(
    id: number,
    updateEconomy: EconomyUpdateDTO,
  ): Promise<Economy | null> {
    return this.economyRepository.updateEconomy(id, updateEconomy);
  }

  async deleteEconomy(id: number): Promise<void> {
    return this.economyRepository.deleteEconomy(id);
  }
}
