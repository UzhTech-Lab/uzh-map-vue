import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './education.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EducationCreateDTO } from './dtos/education-create.dto';
import { EducationUpdateDTO } from './dtos/education-update.dto';
import { CommunityRepository } from 'src/community/community.repository';

@Injectable()
export class EducationRepository {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    private readonly communityRepo: CommunityRepository,
  ) {}

  async findAllPlaces(): Promise<Education[]> {
    return this.educationRepository.find();
  }

  async findById(id: number): Promise<Education | null> {
    const argiculture = await this.educationRepository.findOne({
      where: { id },
    });
    if (!argiculture) {
      throw new NotFoundException('The education not found');
    }
    return argiculture;
  }

  async findByCommunityId(id: number): Promise<Education[]> {
    return this.educationRepository.find({
      where: { community: { id } },
    });
  }

  async createEducationPlace(
    educationPlace: EducationCreateDTO,
  ): Promise<Education> {
    const community = await this.communityRepo.findById(
      educationPlace.communityId,
    );

    if (!community) {
      throw new NotFoundException('Community not found');
    }
    const place = this.educationRepository.create(educationPlace);
    place.community = community;

    return await this.educationRepository.save(place);
  }

  async saveEducationPlace(educationPlace: Education): Promise<Education> {
    return this.educationRepository.save(educationPlace);
  }

  async updateEducationPlace(
    id: number,
    educationPlace: EducationUpdateDTO,
  ): Promise<Education | null> {
    const place = await this.educationRepository.findOne({ where: { id } });
    if (!place) {
      throw new NotFoundException('Place not found');
    }
    await this.educationRepository.update(id, educationPlace);

    const updatedPlace = await this.educationRepository.findOne({
      where: { id: id },
    });
    return updatedPlace;
  }

  async deleteEducationPlace(id: number): Promise<void> {
    await this.educationRepository.delete(id);
  }
}
