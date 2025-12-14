import { Injectable } from '@nestjs/common';
import { CommunityRepository } from './community.repository';
import { Community } from './community.entity';
import { CommunityCreateDTO } from './dtos/community-create.dto';
import { CommunityUpdateDTO } from './dtos/community-update.dto';
import { FullCommunityCreateDTO } from './dtos/full-community-create.dto';
import { GeographyRepository } from 'src/geography/geography.repository';
import { PopulationRepository } from 'src/population/population.repository';
import { EconomyRepository } from 'src/economy/economy.repository';
import { InfrastructureRepository } from 'src/infrastructure/infrastructure.repository';
import { AgricultureRepository } from 'src/argiculture/agriculture.repository';
import { EducationRepository } from 'src/education/education.repository';

@Injectable()
export class CommunityService {
  constructor(
    private readonly communityRepo: CommunityRepository,

    private readonly geographyRepo: GeographyRepository,

    private readonly populationRepo: PopulationRepository,

    private readonly economyRepo: EconomyRepository,

    private readonly infrastructureRepo: InfrastructureRepository,

    private readonly agricultureRepo: AgricultureRepository,

    private readonly educationRepo: EducationRepository,
  ) {}

  findAll(): Promise<Community[]> {
    return this.communityRepo.findAll();
  }

  async getNames(): Promise<{ id: number; name: string }[]> {
    const communities = await this.communityRepo.find();
    return communities.map(({ id, name }) => ({ id, name }));
  }

  findById(id: number): Promise<Community> {
    return this.communityRepo.findById(id);
  }

  create(dto: CommunityCreateDTO): Promise<Community> {
    return this.communityRepo.createCommunity(dto);
  }

  async createFullCommunity(dto: FullCommunityCreateDTO): Promise<Community> {
    const newCommunity: CommunityCreateDTO = {
      name: dto.name,
      edrpou_code: dto.edrpou_code,
      region: dto.region,
      district: dto.district,
      center_settlement: dto.center_settlement,
      postal_index: dto.postal_index,
      email: dto.email,
      phone: dto.phone,
      website: dto.website,
      photos: dto.photos,
      history: dto.history,
      settlements: dto.settlements,
      population_amount: dto.population_amount,
      established: dto.established,
      area_km2: dto.area_km2,
      center: dto.center,
      geography_description: dto.geography_description,
      coordinates: dto.coordinates,
      keyPlaces: dto.keyPlaces,
    };

    const savedCommunity =
      await this.communityRepo.createCommunity(newCommunity);

    for (const arg of dto.geography) {
      const geography_place = await this.geographyRepo.createGeography({
        ...arg,
        communityId: savedCommunity.id,
      });

      geography_place.community = savedCommunity;
      await this.geographyRepo.saveGeography(geography_place);
    }

    const population = await this.populationRepo.createPopulation({
      ...dto.population,
      communityId: savedCommunity.id,
    });
    population.community = savedCommunity;
    await this.populationRepo.savePopulation(population);

    const economy = await this.economyRepo.createEconomy({
      ...dto.economy,
      communityId: savedCommunity.id,
    });
    economy.community = savedCommunity;
    await this.economyRepo.saveEconomy(economy);

    const infrastructure = await this.infrastructureRepo.createInfrastucture({
      ...dto.infrastructure,
      communityId: savedCommunity.id,
    });
    infrastructure.community = savedCommunity;
    await this.infrastructureRepo.saveInfrastructure(infrastructure);

    for (const arg of dto.argiculture_places) {
      const argiculture = await this.agricultureRepo.createAgriculture({
        ...arg,
        communityId: savedCommunity.id,
      });
      argiculture.community = savedCommunity;
      await this.agricultureRepo.saveArgiculture(argiculture);
    }

    for (const edu of dto.education_places) {
      const education = await this.educationRepo.createEducationPlace({
        ...edu,
        communityId: savedCommunity.id,
      });
      education.community = savedCommunity;
      await this.educationRepo.saveEducationPlace(education);
    }

    return this.communityRepo.findById(savedCommunity.id);
  }

  update(id: number, dto: CommunityUpdateDTO): Promise<Community> {
    return this.communityRepo.updateCommunity(id, dto);
  }

  delete(id: number): Promise<void> {
    return this.communityRepo.deleteCommunity(id);
  }
}
