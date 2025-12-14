import { forwardRef, Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { EducationRepository } from './education.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './education.entity';
import { CommunityModule } from 'src/community/community.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Education]),
    forwardRef(() => CommunityModule),
  ],
  controllers: [EducationController],
  providers: [EducationService, EducationRepository],
  exports: [EducationRepository],
})
export class EducationModule {}
