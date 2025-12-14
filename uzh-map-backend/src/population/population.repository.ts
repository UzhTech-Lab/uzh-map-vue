import { InjectRepository } from '@nestjs/typeorm';
import { Population } from './population.entity';
import { Repository } from 'typeorm';
import { PopulationUpdateDTO } from './dtos/population-update.dto';
import { CreatePopulationDTO } from './dtos/population-create.dto';
import { NotFoundException } from '@nestjs/common';
import { CommunityRepository } from 'src/community/community.repository';

export class PopulationRepository {
  constructor(
    @InjectRepository(Population)
    private readonly populationRepository: Repository<Population>,
    private readonly communityRepo: CommunityRepository,
  ) {}

  async findAllPopulation(): Promise<Population[]> {
    return this.populationRepository.find();
  }

  async findPopulationByCommunityId(id: number): Promise<Population[]> {
    return this.populationRepository.find({ where: { community: { id } } });
  }

  async findPopulationById(id: number): Promise<Population | null> {
    return this.populationRepository.findOne({ where: { community: { id } } });
  }

  async createPopulation(population: CreatePopulationDTO): Promise<Population> {
    const community = await this.communityRepo.findById(population.communityId);

    if (!community) throw new NotFoundException('Community not found');

    const newPopulaiton = this.populationRepository.create(population);

    newPopulaiton.community = community;

    return await this.populationRepository.save(population);
  }

  async savePopulation(population: Population): Promise<Population> {
    return this.populationRepository.save(population);
  }

  async updatePopulation(
    id: number,
    population: PopulationUpdateDTO,
  ): Promise<Population | null> {
    const newPopulation = await this.populationRepository.findOne({
      where: { id: id },
    });

    if (!newPopulation) {
      throw new NotFoundException(`Population not found`);
    }

    await this.populationRepository.update(id, population);

    return this.populationRepository.findOne({ where: { id: id } });
  }

  async deletePopulation(id: number): Promise<void> {
    await this.populationRepository.delete(id);
  }
}
