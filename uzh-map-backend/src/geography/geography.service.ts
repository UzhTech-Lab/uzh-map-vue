import { Injectable } from '@nestjs/common';
import { GeographyRepository } from './geography.repository';
import { Geography } from './geography.entity';
import { GeographyCreateDTO } from './dtos/geography-create.dto';
import { GeographyUpdateDTO } from './dtos/geography-update.dto';

@Injectable()
export class GeographyService {
  constructor(private readonly geographyRepository: GeographyRepository) {}

  async getGeographyById(id: number): Promise<Geography | null> {
    return await this.geographyRepository.findById(id);
  }

  async getGeographyByCommunityId(id: number): Promise<Geography[]> {
    return this.geographyRepository.findByCommunityId(id);
  }

  async getGeography(): Promise<Geography[]> {
    return this.geographyRepository.findAllGeography();
  }

  async createGeography(geography: GeographyCreateDTO): Promise<Geography> {
    return this.geographyRepository.createGeography(geography);
  }

  async updateGeography(
    id: number,
    geography: GeographyUpdateDTO,
  ): Promise<Geography | null> {
    return this.geographyRepository.updateGeography(id, geography);
  }

  async deleteGeography(id: number): Promise<void> {
    return this.geographyRepository.deleteGeography(id);
  }
}
