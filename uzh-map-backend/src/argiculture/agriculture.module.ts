import { forwardRef, Module } from '@nestjs/common';
import { ArgicultureController } from './agriculture.controller';
import { AgricultureService } from './agriculture.service';
import { AgricultureRepository } from './agriculture.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agriculture } from './agriculture.entity';
import { CommunityModule } from 'src/community/community.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agriculture]),
    forwardRef(() => CommunityModule),
  ],
  controllers: [ArgicultureController],
  providers: [AgricultureService, AgricultureRepository],
  exports: [AgricultureRepository],
})
export class ArgicultureModule {}
