import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class NationalityUpdateDTO {
  @IsOptional()
  @ApiProperty({ example: 'українці' })
  @IsString()
  nationality_name: string;

  @IsOptional()
  @ApiProperty({ example: 100 })
  @IsNumber()
  percent: number;
}

export class PopulationUpdateDTO {
  @IsOptional()
  @ApiProperty({ example: 20000 })
  @IsNumber()
  @IsPositive()
  amount?: number;

  @IsOptional()
  @ApiProperty({ example: 200 })
  @IsInt()
  @IsPositive()
  preschool_age?: number;

  @IsOptional()
  @ApiProperty({ example: 400 })
  @IsInt()
  @IsPositive()
  school_age?: number;

  @IsOptional()
  @ApiProperty({ example: 4000 })
  @IsNumber()
  working_age?: number;

  @IsOptional()
  @ApiProperty({ example: 2300 })
  @IsInt()
  @IsPositive()
  retired?: number;

  @IsOptional()
  @ApiProperty({ example: 6300 })
  @IsInt()
  @IsPositive()
  voters?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NationalityUpdateDTO)
  nationalities: NationalityUpdateDTO[];
}
