import { forwardRef, Module } from '@nestjs/common';
import { InfrastructureController } from './infrastructure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Infrastructure } from './infrastructure.entity';
import { InfrastructureService } from './infrastructure.service';
import { InfrastructureRepository } from './infrastructure.repository';
import { CommunityModule } from 'src/community/community.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Infrastructure]),
    forwardRef(() => CommunityModule),
  ],
  controllers: [InfrastructureController],
  providers: [InfrastructureService, InfrastructureRepository],
  exports: [InfrastructureRepository],
})
export class InfrastructureModule {}
