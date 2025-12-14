import { Injectable } from '@nestjs/common';
import { Education } from './education.entity';
import { EducationRepository } from './education.repository';
import { EducationCreateDTO } from './dtos/education-create.dto';
import { EducationUpdateDTO } from './dtos/education-update.dto';

@Injectable()
export class EducationService {
  constructor(private readonly educationRepository: EducationRepository) {}

  async getAllEducationPlaces(): Promise<Education[]> {
    return this.educationRepository.findAllPlaces();
  }

  async getEducationPlaces(id: number): Promise<Education[]> {
    return this.educationRepository.findByCommunityId(id);
  }

  async getPlaceById(id: number): Promise<Education | null> {
    return this.educationRepository.findById(id);
  }

  async createEducationPlace(
    educationPlace: EducationCreateDTO,
  ): Promise<Education> {
    return this.educationRepository.createEducationPlace(educationPlace);
  }

  async updateEducationPlace(
    id: number,
    educationPlace: EducationUpdateDTO,
  ): Promise<Education | null> {
    return this.educationRepository.updateEducationPlace(id, educationPlace);
  }

  async deleteEducationPlace(id: number): Promise<void> {
    return this.educationRepository.deleteEducationPlace(id);
  }
}
