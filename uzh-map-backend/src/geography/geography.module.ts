import { forwardRef, Module } from '@nestjs/common';
import { GeographyController } from './geography.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geography } from './geography.entity';
import { GeographyService } from './geography.service';
import { GeographyRepository } from './geography.repository';
import { CommunityModule } from 'src/community/community.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Geography]),
    forwardRef(() => CommunityModule),
  ],
  controllers: [GeographyController],
  providers: [GeographyService, GeographyRepository],
  exports: [GeographyRepository],
})
export class GeographyModule {}
