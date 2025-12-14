import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class InfrastructureUpdateDTO {
  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  roads: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  railway: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  busses: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsNumber()
  stations: number;
}
