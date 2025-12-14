import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { Categories } from 'src/assets/enums/education-categories-enums';

export class EducationCreateDTO {
  @ApiProperty({ example: 'Ліцей' })
  @IsString()
  name: string;

  @ApiProperty({ example: Object.values(Categories) })
  @IsEnum(Categories)
  category: Categories;

  @ApiProperty({ example: 2 })
  @IsInt()
  amount?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  communityId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  hospitals: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  schools: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  universities: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  libraries: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  theaters: number;
}
