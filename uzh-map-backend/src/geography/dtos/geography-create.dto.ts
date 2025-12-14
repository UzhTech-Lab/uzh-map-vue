import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { Categories } from 'src/assets/enums/geography-categories-enums';

export class GeographyCreateDTO {
  @ApiProperty({ example: 'Уж' })
  @IsString()
  name: string;

  @ApiProperty({ example: { example: Object.values(Categories) } })
  @IsEnum(Categories)
  category: Categories;

  @ApiProperty({ example: 1 })
  @IsInt()
  communityId: number;
}
