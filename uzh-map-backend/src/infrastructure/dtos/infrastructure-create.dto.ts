import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber } from 'class-validator';

export class InfrastructureCreateDTO {
  @ApiProperty({ example: true })
  @IsBoolean()
  roads: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  railway: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  busses: boolean;

  @ApiProperty({ example: 5 })
  @IsNumber()
  stations: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  communityId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  markets: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  shoppingCenters: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  supermarkets: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  restaurants: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  cafes: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  hotels: number;
}
