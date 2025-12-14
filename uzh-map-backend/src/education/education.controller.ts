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
import { Education } from './education.entity';
import { EducationService } from './education.service';
import { EducationCreateDTO } from './dtos/education-create.dto';
import { EducationUpdateDTO } from './dtos/education-update.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Education')
@Controller('/api/v1/education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get all education places by community ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of education places for the community',
    type: Education,
    isArray: true,
  })
  async getEducationPlaces(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Education[]> {
    try {
      return await this.educationService.getEducationPlaces(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during fetching education places',
      );
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all education place by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Education place by id',
    type: Education,
  })
  async getEducationPlaceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Education | null> {
    try {
      return await this.educationService.getPlaceById(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during fetching education place',
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new education place' })
  @ApiBody({ type: EducationCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Education place successfully created',
    type: Education,
  })
  async createEducationPlace(
    @Body() body: EducationCreateDTO,
  ): Promise<Education> {
    try {
      return this.educationService.createEducationPlace(body);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during creating education place',
      );
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an education place by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: EducationUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Education place updated',
    type: Education,
  })
  async updatedEducationPlace(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EducationUpdateDTO,
  ): Promise<Education | null> {
    try {
      return this.educationService.updateEducationPlace(id, body);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during updating education place',
      );
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an education place by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Education place deleted' })
  async deleteEducationPlace(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      return this.educationService.deleteEducationPlace(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during deleting education place',
      );
    }
  }
}
