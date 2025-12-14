import { forwardRef, Module } from '@nestjs/common';
import { EconomyController } from './economy.controller';
import { EconomyService } from './economy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Economy } from './economy.entity';
import { EconomyRepository } from './economy.repository';
import { CommunityModule } from 'src/community/community.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Economy]),
    forwardRef(() => CommunityModule),
  ],
  controllers: [EconomyController],
  providers: [EconomyService, EconomyRepository],
  exports: [EconomyRepository],
})
export class EconomyModule {}
