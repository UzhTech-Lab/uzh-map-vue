import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class AgricultureCreateDTO {
  @ApiProperty({ example: 'Угіддя' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2304 га' })
  @IsString()
  details?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  communityId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  farmlandPercent: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  mainCrops: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  organicFarms: number;
}
