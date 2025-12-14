import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

import { GeographyCreateDTO } from '../../geography/dtos/geography-create.dto';
import { CreatePopulationDTO } from '../../population/dtos/population-create.dto';
import { EconomyCreateDTO } from '../../economy/dtos/economy-create.dto';
import { InfrastructureCreateDTO } from '../../infrastructure/dtos/infrastructure-create.dto';
import { AgricultureCreateDTO } from '../../argiculture/dtos/argiculture-create.dto';
import { EducationCreateDTO } from '../../education/dtos/education-create.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Center } from '../community.entity';

export class FullCommunityCreateDTO {
  @ApiProperty({ example: 'Ужгородська громада' })
  @IsString()
  name: string;

  @ApiProperty({ example: '33868924' })
  @IsString()
  edrpou_code: string;

  @ApiProperty({ example: 'Закарпатська область' })
  @IsString()
  region: string;

  @ApiProperty({ example: 'Ужгородський район' })
  @IsString()
  district: string;

  @ApiProperty({ example: 'Ужгород' })
  @IsString()
  center_settlement: string;

  @ApiProperty({ example: '88000' })
  @IsString()
  postal_index: string;

  @ApiProperty({ example: 'умr@rada-uzhgorod.gov.ua' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '(0312)-42-80-26' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'http://t-remeta.gov.ua' })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ example: 1235 })
  @IsNumber()
  population_amount: number;

  @ApiProperty({ example: 1235 })
  @IsNumber()
  established: number;

  @ApiProperty({ example: 1235 })
  @IsNumber()
  area_km2: number;

  @ApiProperty({
    example:
      'Громада утворилась на базі лише одного населеного пункту – міста Ужгорода',
  })
  @IsString()
  geography_description: string;

  @IsObject()
  center: Center;

  @IsArray()
  @IsArray({ each: true })
  @IsArray({ each: true })
  coordinates: [number, number][][];

  @ApiProperty()
  keyPlaces: string[];

  @IsOptional()
  @IsArray()
  photos?: string[];

  @ApiProperty({
    example:
      'Громада утворилась на базі лише одного населеного пункту – міста Ужгорода',
  })
  @IsString()
  history: string;

  @ApiProperty({
    example: ['Ужгород'],
  })
  @IsArray()
  settlements: string[];

  @ApiProperty({
    type: [GeographyCreateDTO],
  })
  @ValidateNested()
  @Type(() => GeographyCreateDTO)
  geography: GeographyCreateDTO[];

  @ApiProperty({
    example: {
      amount: 5224,
      preschool_age: 384,
      school_age: 1111,
      working_age: 3082,
      retired: 647,
      voters: 123,
      nationalities: [],
    },
  })
  @ValidateNested()
  @Type(() => CreatePopulationDTO)
  population: CreatePopulationDTO;

  @ApiProperty({
    example: {
      budget: 236852.212,
      industry_amount: 2,
      trade_amount: 10,
      enterprises_amount: 5,
    },
  })
  @ValidateNested()
  @Type(() => EconomyCreateDTO)
  economy: EconomyCreateDTO;

  @ApiProperty({
    example: {
      roads: true,
      railway: false,
      busses: true,
      stations: 0,
    },
  })
  @ValidateNested()
  @Type(() => InfrastructureCreateDTO)
  infrastructure: InfrastructureCreateDTO;

  @ApiProperty({
    type: [AgricultureCreateDTO],
  })
  @ValidateNested({ each: true })
  @Type(() => AgricultureCreateDTO)
  argiculture_places: AgricultureCreateDTO[];

  @ApiProperty({
    type: [EducationCreateDTO],
  })
  @ValidateNested({ each: true })
  @Type(() => EducationCreateDTO)
  education_places: EducationCreateDTO[];
}
