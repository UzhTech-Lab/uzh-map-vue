import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Infrastructure } from './infrastructure.entity';
import { InfrastructureCreateDTO } from './dtos/infrastructure-create.dto';
import { InfrastructureService } from './infrastructure.service';
import { InfrastructureUpdateDTO } from './dtos/infrastructure-update.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Infrastructure')
@Controller('/api/v1/infrastructure')
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  @Get('/community/:id')
  @ApiOperation({ summary: 'Get infrastructure by community ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of infrastructure records for a community',
    type: Infrastructure,
    isArray: true,
  })
  async getInfrastructureByCommunityId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Infrastructure[]> {
    return this.infrastructureService.getInfrastructureByCommunityId(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get infrastructure by community ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of infrastructure records for a community',
    type: Infrastructure,
    isArray: true,
  })
  async getInfrastructureById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Infrastructure | null> {
    return this.infrastructureService.getInfrastructureById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new infrastructure record' })
  @ApiBody({ type: InfrastructureCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Infrastructure created successfully',
    type: Infrastructure,
  })
  async createInfrastructure(
    @Body() infrastructure: InfrastructureCreateDTO,
  ): Promise<Infrastructure> {
    return this.infrastructureService.createInfrastructure(infrastructure);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an infrastructure record by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: InfrastructureUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Infrastructure updated',
    type: Infrastructure,
  })
  async updateInfrastructure(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInfrastructure: InfrastructureUpdateDTO,
  ): Promise<Infrastructure | null> {
    return this.infrastructureService.updateInfrastructure(
      id,
      updateInfrastructure,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete infrastructure record by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Infrastructure deleted' })
  async deleteInfrastructure(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.infrastructureService.deleteInfrastructure(id);
  }
}
