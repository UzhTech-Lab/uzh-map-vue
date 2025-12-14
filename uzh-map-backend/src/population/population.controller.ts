import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PopulationService } from './population.service';
import { Population } from './population.entity';
import { CreatePopulationDTO } from './dtos/population-create.dto';
import { PopulationUpdateDTO } from './dtos/population-update.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Population')
@Controller('api/v1/population')
export class PopulationController {
  constructor(private readonly populationService: PopulationService) {}

  @Get('/community/:id')
  @ApiOperation({ summary: 'Get population by community ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of population records for a community',
    type: Population,
    isArray: true,
  })
  async getPopulationByCommunityId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Population[]> {
    try {
      return this.populationService.findPopulationByCommunityId(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during getting population',
      );
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get population by community ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of population records for a community',
    type: Population,
    isArray: true,
  })
  async getPopulationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Population | null> {
    try {
      return this.populationService.findPopulationById(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during getting population',
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new population entry' })
  @ApiBody({ type: CreatePopulationDTO })
  @ApiResponse({
    status: 201,
    description: 'Population entry created',
    type: Population,
  })
  async createPopulation(
    @Body() population: CreatePopulationDTO,
  ): Promise<Population> {
    try {
      return this.populationService.createPopulation(population);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during creating population',
      );
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update population entry by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: PopulationUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Population updated',
    type: Population,
  })
  async updatePopulation(
    @Param('id', ParseIntPipe) id: number,
    @Body() population: PopulationUpdateDTO,
  ): Promise<Population | null> {
    try {
      return this.populationService.updatePopulation(id, population);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during updating population',
      );
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete population by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Population deleted' })
  async deletePopulation(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      return this.populationService.deletePopulation(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during deleting population',
      );
    }
  }
}
