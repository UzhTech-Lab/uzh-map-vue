import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { CommunityRepository } from './community.repository';
import { GeographyModule } from 'src/geography/geography.module';
import { ArgicultureModule } from 'src/argiculture/agriculture.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { PopulationModule } from 'src/population/population.module';
import { EconomyModule } from 'src/economy/economy.module';
import { EducationModule } from 'src/education/education.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community]),
    GeographyModule,
    ArgicultureModule,
    InfrastructureModule,
    PopulationModule,
    EconomyModule,
    EducationModule,
  ],
  controllers: [CommunityController],
  providers: [CommunityService, CommunityRepository],
  exports: [CommunityRepository],
})
export class CommunityModule {}
