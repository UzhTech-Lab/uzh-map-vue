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
import { GeographyService } from './geography.service';
import { Geography } from './geography.entity';
import { GeographyCreateDTO } from './dtos/geography-create.dto';
import { GeographyUpdateDTO } from './dtos/geography-update.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Geography')
@Controller('api/v1/geography')
export class GeographyController {
  constructor(private readonly geographyService: GeographyService) {}

  @Get('/community/:id')
  @ApiOperation({ summary: 'Get geography by community ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Geography found for community',
    type: Geography,
    isArray: true,
  })
  async getGeographyCommunityById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Geography[]> {
    try {
      return this.geographyService.getGeographyByCommunityId(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during getting geography',
      );
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get geography by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Geography data found by ID',
    type: Geography,
    isArray: true,
  })
  async getGeographyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Geography | null> {
    try {
      return this.geographyService.getGeographyById(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during getting geography',
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new geography entry' })
  @ApiBody({ type: GeographyCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Geography created',
    type: Geography,
  })
  async createGeography(
    @Body() geography: GeographyCreateDTO,
  ): Promise<Geography> {
    try {
      return this.geographyService.createGeography(geography);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during creating geography',
      );
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update geography by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: GeographyUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Geography updated',
    type: Geography,
  })
  async updateGeorgaphy(
    @Param('id', ParseIntPipe) id: number,
    @Body() geography: GeographyUpdateDTO,
  ): Promise<Geography | null> {
    try {
      return this.geographyService.updateGeography(id, geography);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during updating geography',
      );
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete geography by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Geography deleted' })
  async deleteGeorgaphy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      return this.geographyService.deleteGeography(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during deleting geography',
      );
    }
  }
}
