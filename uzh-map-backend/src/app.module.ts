import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Community } from './community/community.entity';
import { Geography } from './geography/geography.entity';
import { Population } from './population/population.entity';
import { Agriculture } from './argiculture/agriculture.entity';
import { Education } from './education/education.entity';
import { Economy } from './economy/economy.entity';
import { Infrastructure } from './infrastructure/infrastructure.entity';
import { OtgData } from './otg-data/otg-data.entity';
import { CommunityModule } from './community/community.module';
import { ArgicultureModule } from './argiculture/agriculture.module';
import { EconomyModule } from './economy/economy.module';
import { EducationModule } from './education/education.module';
import { GeographyModule } from './geography/geography.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PopulationModule } from './population/population.module';
import { SeedService } from '../seed/seed.service';
import { OtgDataModule } from './otg-data/otg-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [
        Community,
        Geography,
        Population,
        Agriculture,
        Education,
        Economy,
        Infrastructure,
        OtgData,
      ],
    }),
    TypeOrmModule.forFeature([OtgData]),
    CommunityModule,
    ArgicultureModule,
    EconomyModule,
    EducationModule,
    GeographyModule,
    InfrastructureModule,
    PopulationModule,
    OtgDataModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
