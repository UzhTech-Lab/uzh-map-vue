import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Center } from '../community.entity';

export class CommunityCreateDTO {
  @ApiProperty({ example: 'Ужгородська громада' })
  @IsString()
  name: string;

  @ApiProperty({ example: '33868924' })
  @IsString()
  edrpou_code: string;

  @ApiProperty({ example: 'Закарпатська область' })
  @IsString()
  region: string;

  @ApiProperty({ example: 1235 })
  @IsNumber()
  population_amount: number;

  @ApiProperty({ example: 1235 })
  @IsNumber()
  established: number;

  @ApiProperty({ example: 1235 })
  @IsNumber()
  area_km2: number;

  @IsArray()
  coordinates: [number, number][][];

  @ApiProperty()
  keyPlaces: string[];

  @ApiProperty({
    example:
      'Громада утворилась на базі лише одного населеного пункту – міста Ужгорода',
  })
  @IsNumber()
  geography_description: string;

  @IsObject()
  center: Center;

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
    example: '["Ужгород"]',
  })
  @IsArray()
  settlements: string[];
}
