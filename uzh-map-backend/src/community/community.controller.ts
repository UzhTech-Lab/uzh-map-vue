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
import { CommunityService } from './community.service';
import { CommunityCreateDTO } from './dtos/community-create.dto';
import { CommunityUpdateDTO } from './dtos/community-update.dto';
import { Community } from './community.entity';
import { FullCommunityCreateDTO } from './dtos/full-community-create.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Community')
@Controller('api/v1/community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  @ApiOperation({ summary: 'Receive the list of communities' })
  @ApiResponse({
    status: 200,
    description: 'Received list',
    type: Community,
    isArray: true,
  })
  async findAll(): Promise<Community[]> {
    try {
      return this.communityService.findAll();
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during community receiving',
      );
    }
  }

  @Get('/list')
  @ApiOperation({ summary: 'Return a list with the names of all communities' })
  @ApiResponse({
    status: 200,
    description: "List with communities' names",
    isArray: true,
  })
  async getCommunityList(): Promise<{ id: number; name: string }[]> {
    try {
      return this.communityService.getNames();
    } catch (error) {
      throw new BadRequestException(
        error.message || "Error during getting communities' name",
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Receive the community by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Community ID' })
  @ApiResponse({
    status: 200,
    description: 'Received some community with all information about it',
    type: Community,
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Community> {
    try {
      return this.communityService.findById(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during getting community ',
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Creating community' })
  @ApiBody({ type: CommunityCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Community created',
    type: Community,
  })
  async create(@Body() dto: CommunityCreateDTO): Promise<Community> {
    try {
      return this.communityService.create(dto);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during community creation',
      );
    }
  }

  @Post('/full')
  @ApiBody({ type: FullCommunityCreateDTO })
  @ApiOperation({
    summary:
      'Create a full community with related data (population, infrastructure, etc.)',
  })
  @ApiResponse({
    status: 201,
    description: 'Full community created with nested data',
    type: Community,
  })
  async createFullCommunity(
    @Body() dto: FullCommunityCreateDTO,
  ): Promise<Community | null> {
    try {
      return this.communityService.createFullCommunity(dto);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during full community creation',
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a community by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CommunityUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Community updated',
    type: Community,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CommunityUpdateDTO,
  ): Promise<Community> {
    return this.communityService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a community by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Community deleted' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.communityService.delete(id);
  }
}
