import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OtgDataService, OtgDataItem } from './otg-data.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('OTG Data')
@Controller('api/v1/otg-data')
export class OtgDataController {
  constructor(private readonly otgDataService: OtgDataService) {}

  @Get()
  @ApiOperation({
    summary: 'Отримати всі ОТГ',
    description:
      "Повертає список всіх об'єднаних територіальних громад з повною інформацією",
  })
  @ApiResponse({
    status: 200,
    description: 'Список ОТГ успішно отримано',
  })
  async findAll(): Promise<OtgDataItem[]> {
    try {
      return await this.otgDataService.findAll();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Помилка при отриманні даних ОТГ';
      throw new BadRequestException(errorMessage);
    }
  }

  @Get('search')
  @ApiOperation({
    summary: 'Пошук ОТГ за назвою',
    description: 'Здійснює пошук громад за частковою відповідністю назви',
  })
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Назва або частина назви ОТГ для пошуку',
    example: 'Ужгород',
  })
  @ApiResponse({
    status: 200,
    description: 'Результати пошуку успішно отримано',
  })
  async search(@Query('name') name: string): Promise<OtgDataItem[]> {
    try {
      if (!name) {
        throw new BadRequestException("Параметр name є обов'язковим");
      }
      return await this.otgDataService.search(name);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Помилка при пошуку ОТГ';
      throw new BadRequestException(errorMessage);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Отримати ОТГ за ID',
    description:
      'Повертає детальну інформацію про конкретну територіальну громаду',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Унікальний ідентифікатор ОТГ',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'ОТГ успішно знайдено',
  })
  @ApiResponse({
    status: 404,
    description: 'ОТГ з таким ID не знайдено',
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<OtgDataItem> {
    try {
      const otg = await this.otgDataService.findById(id);
      if (!otg) {
        throw new NotFoundException(`ОТГ з ID ${id} не знайдено`);
      }
      return otg;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errorMessage =
        error instanceof Error ? error.message : 'Помилка при отриманні ОТГ';
      throw new BadRequestException(errorMessage);
    }
  }
}
