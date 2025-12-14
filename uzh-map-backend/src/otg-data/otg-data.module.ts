import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtgDataController } from './otg-data.controller';
import { OtgDataService } from './otg-data.service';
import { OtgData } from './otg-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtgData])],
  controllers: [OtgDataController],
  providers: [OtgDataService],
  exports: [OtgDataService],
})
export class OtgDataModule {}
