import { Injectable } from '@nestjs/common';
import { Population } from './population.entity';
import { CreatePopulationDTO } from './dtos/population-create.dto';
import { PopulationUpdateDTO } from './dtos/population-update.dto';
import { PopulationRepository } from './population.repository';

@Injectable()
export class PopulationService {
  constructor(private readonly populationRepository: PopulationRepository) {}

  async findAllPopulation(): Promise<Population[]> {
    return this.populationRepository.findAllPopulation();
  }

  async findPopulationByCommunityId(id: number): Promise<Population[]> {
    return this.populationRepository.findPopulationByCommunityId(id);
  }

  async findPopulationById(id: number): Promise<Population | null> {
    return this.populationRepository.findPopulationById(id);
  }

  async createPopulation(population: CreatePopulationDTO): Promise<Population> {
    return this.populationRepository.createPopulation(population);
  }

  async updatePopulation(
    id: number,
    population: PopulationUpdateDTO,
  ): Promise<Population | null> {
    return this.populationRepository.updatePopulation(id, population);
  }

  async deletePopulation(id: number): Promise<void> {
    await this.populationRepository.deletePopulation(id);
  }
}
