import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AgricultureUpdateDTO {
  @ApiProperty({ example: 'Угіддя' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: '2304 га' })
  @IsOptional()
  @IsString()
  details: string;
}
