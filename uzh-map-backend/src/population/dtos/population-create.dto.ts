import {
  IsNumber,
  IsArray,
  ValidateNested,
  IsPositive,
  IsInt,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class NationalityDTO {
  @ApiProperty({ example: 'українці' })
  @IsString()
  nationality_name: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  percent: number;
}

export class CreatePopulationDTO {
  @ApiProperty({ example: 20000 })
  @IsNumber()
  @IsPositive()
  amount?: number;

  @ApiProperty({ example: 200 })
  @IsInt()
  @IsPositive()
  preschool_age?: number;

  @ApiProperty({ example: 400 })
  @IsInt()
  @IsPositive()
  school_age?: number;

  @ApiProperty({ example: 4000 })
  @IsNumber()
  working_age?: number;

  @ApiProperty({ example: 2300 })
  @IsInt()
  @IsPositive()
  retired?: number;

  @ApiProperty({ example: 6300 })
  @IsInt()
  @IsPositive()
  voters?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NationalityDTO)
  nationalities: NationalityDTO[];

  @ApiProperty({ example: 1 })
  @IsInt()
  communityId: number;
}
