import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Categories } from 'src/assets/enums/education-categories-enums';

export class EducationUpdateDTO {
  @IsOptional()
  @ApiProperty({ example: 'Ліцей №8' })
  @IsString()
  name: string;

  @ApiProperty({ example: Object.values(Categories) })
  @IsOptional()
  @IsEnum(Categories)
  category: Categories;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsInt()
  amount: number;
}
