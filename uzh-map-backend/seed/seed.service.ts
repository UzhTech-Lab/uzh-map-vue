import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityRepository } from 'src/community/community.repository';
import { FullCommunityCreateDTO } from 'src/community/dtos/full-community-create.dto';
import { OtgData } from 'src/otg-data/otg-data.entity';
import { join } from 'path';

interface SeedFile {
  communities: FullCommunityCreateDTO[];
}

interface OtgDataItem {
  id: number;
  name: string;
  type: string;
  region: string;
  area_km2: number;
  population: number;
  settlements: number;
  established: number;
  center: {
    latitude: number;
    longitude: number;
  };
  polygonName: string;
  color: string;
  highlights: string[];
  keyPlaces: Record<string, unknown>[];
  history: string;
  geography: string;
  demographics: Record<string, unknown> | null;
  economy: Record<string, unknown> | null;
  transport: Record<string, unknown> | null;
  agriculture: Record<string, unknown> | null;
  trade: Record<string, unknown> | null;
  humanitarian: Record<string, unknown> | null;
  religion: Record<string, unknown> | null;
  sports: Record<string, unknown> | null;
}

@Injectable()
export class SeedService {
  constructor(
    private readonly communityRepo: CommunityRepository,
    @InjectRepository(OtgData)
    private readonly otgDataRepository: Repository<OtgData>,
  ) {}

  async run(): Promise<void> {
    // Seed communities
    try {
      const raw = await fs.readFile('seed/data.json', 'utf-8');
      const data = JSON.parse(raw) as SeedFile;

      for (const community of data.communities) {
        await this.communityRepo.createCommunity(community);
      }
      console.log('Communities seeded successfully');
    } catch (error) {
      console.log('Error seeding communities or file not found:', error);
    }

    // Seed OTG data
    await this.seedOtgData();
  }

  private async seedOtgData(): Promise<void> {
    try {
      // Check if data already exists
      const count = await this.otgDataRepository.count();
      if (count > 0) {
        console.log('OTG data already exists. Skipping seed.');
        return;
      }

      const dataPath = join(process.cwd(), 'seed', 'otgData.json');
      const raw = await fs.readFile(dataPath, 'utf-8');
      const otgDataList = JSON.parse(raw) as OtgDataItem[];

      // Import polygons
      const {
        polygonU_fixed,
        polygonPerechyn_fixed,
        polygonKostryna_fixed,
        polygonSyurtivka_fixed,
        polygonKholmky_fixed,
        polygonTurya_fixed,
      } = await import('./polygons');

      const polygonMap: Record<string, number[][]> = {
        polygonU_fixed,
        polygonPerechyn_fixed,
        polygonKostryna_fixed,
        polygonSyurtivka_fixed,
        polygonKholmky_fixed,
        polygonTurya_fixed,
      };

      const otgEntities = otgDataList.map((item) => {
        const entity = new OtgData();
        entity.id = item.id;
        entity.name = item.name;
        entity.type = item.type;
        entity.region = item.region;
        entity.area_km2 = item.area_km2;
        entity.population = item.population;
        entity.settlements = item.settlements;
        entity.established = item.established;
        entity.center = item.center;
        entity.polygon = polygonMap[item.polygonName] || [];
        entity.color = item.color;
        entity.highlights = item.highlights;
        entity.keyPlaces = item.keyPlaces;
        entity.history = item.history || '';
        entity.geography = item.geography || '';
        entity.demographics =
          (item.demographics as Record<string, unknown>) || null;
        entity.economy = (item.economy as Record<string, unknown>) || null;
        entity.transport = (item.transport as Record<string, unknown>) || null;
        entity.agriculture =
          (item.agriculture as Record<string, unknown>) || null;
        entity.trade = (item.trade as Record<string, unknown>) || null;
        entity.humanitarian =
          (item.humanitarian as Record<string, unknown>) || null;
        entity.religion = (item.religion as Record<string, unknown>) || null;
        entity.sports = (item.sports as Record<string, unknown>) || null;
        return entity;
      });

      await this.otgDataRepository.save(otgEntities);
      console.log(
        `OTG data seeded successfully. ${otgEntities.length} records inserted.`,
      );
    } catch (error) {
      console.error('Error seeding OTG data:', error);
    }
  }
}
