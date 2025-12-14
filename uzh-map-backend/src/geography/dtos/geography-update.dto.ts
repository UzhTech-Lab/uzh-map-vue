import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Categories } from 'src/assets/enums/geography-categories-enums';

export class GeographyUpdateDTO {
  @ApiProperty({ example: 'Уж' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: Object.values(Categories) })
  @IsOptional()
  @IsEnum(Categories)
  category: Categories;
}
