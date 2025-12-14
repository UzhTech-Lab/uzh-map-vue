import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { OtgData } from './otg-data.entity';

export type OtgDataItem = OtgData;

@Injectable()
export class OtgDataService {
  constructor(
    @InjectRepository(OtgData)
    private otgDataRepository: Repository<OtgData>,
  ) {}

  async findAll(): Promise<OtgData[]> {
    return await this.otgDataRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: number): Promise<OtgData | null> {
    return await this.otgDataRepository.findOne({
      where: { id },
    });
  }

  async search(name: string): Promise<OtgData[]> {
    return await this.otgDataRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async create(otgData: Partial<OtgData>): Promise<OtgData> {
    const entity = this.otgDataRepository.create(otgData);
    return await this.otgDataRepository.save(entity);
  }

  async bulkCreate(otgDataList: Partial<OtgData>[]): Promise<OtgData[]> {
    const entities = this.otgDataRepository.create(otgDataList);
    return await this.otgDataRepository.save(entities);
  }

  async delete(id: number): Promise<void> {
    await this.otgDataRepository.delete(id);
  }

  async clear(): Promise<void> {
    await this.otgDataRepository.clear();
  }

  async count(): Promise<number> {
    return await this.otgDataRepository.count();
  }
}
