import { forwardRef, Module } from '@nestjs/common';
import { PopulationController } from './population.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Population } from './population.entity';
import { PopulationService } from './population.service';
import { PopulationRepository } from './population.repository';
import { CommunityModule } from 'src/community/community.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Population]),
    forwardRef(() => CommunityModule),
  ],
  controllers: [PopulationController],
  providers: [PopulationService, PopulationRepository],
  exports: [PopulationRepository],
})
export class PopulationModule {}
