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
import { AgricultureService } from './agriculture.service';
import { AgricultureCreateDTO } from './dtos/argiculture-create.dto';
import { Agriculture } from './agriculture.entity';
import { AgricultureUpdateDTO } from './dtos/argiculture-update.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Agriculture')
@Controller('/api/v1/argiculture')
export class ArgicultureController {
  constructor(private readonly argicultureService: AgricultureService) {}

  @Get('/community/:id')
  @ApiOperation({ summary: 'Get agriculture data by community ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Community ID' })
  @ApiResponse({
    status: 200,
    description: 'Agriculture data found for the community',
    type: Agriculture,
    isArray: true,
  })
  getArgicultureByCommunityId(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.argicultureService.getArgicultureByCommunityId(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during getting agriculture',
      );
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get agriculture data by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID' })
  @ApiResponse({
    status: 200,
    description: 'Agriculture data found by the ID',
    type: Agriculture,
  })
  getAgricultureById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Agriculture | null> {
    try {
      return this.argicultureService.getArgicultureById(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during getting agriculture',
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new agriculture entry' })
  @ApiBody({ type: AgricultureCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Agriculture data created successfully',
    type: Agriculture,
  })
  postArgiculture(
    @Body() argiculture: AgricultureCreateDTO,
  ): Promise<Agriculture> {
    try {
      return this.argicultureService.createArgiculture(argiculture);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during creating agriculture',
      );
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update existing agriculture entry by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: AgricultureUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Agriculture data updated',
    type: Agriculture,
  })
  patchArgiculture(
    @Param('id', ParseIntPipe) id: number,
    @Body() argiculture: AgricultureUpdateDTO,
  ): Promise<Agriculture | null> {
    try {
      return this.argicultureService.updateAgriculture(id, argiculture);
    } catch (error: any) {
      throw new BadRequestException(
        error.message || 'Error during updating agriculture',
      );
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete agriculture entry by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Agriculture data deleted' })
  deleteArgiculture(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      return this.argicultureService.deleteArgiculture(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during deleting agriculture',
      );
    }
  }
}
