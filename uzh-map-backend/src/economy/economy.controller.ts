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
import { EconomyService } from './economy.service';
import { Economy } from './economy.entity';
import { EconomyCreateDTO } from './dtos/economy-create.dto';
import { EconomyUpdateDTO } from './dtos/economy-update.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Economy')
@Controller('api/v1/economy')
export class EconomyController {
  constructor(private economyService: EconomyService) {}

  @Get('/community/:id')
  @ApiOperation({ summary: 'Get economy entries by community ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of economy entries for a community',
    type: Economy,
    isArray: true,
  })
  async getEconomyByCommunityId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Economy[]> {
    try {
      return await this.economyService.getEconomyByCommunityId(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during getting economy by community',
      );
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get economy entry by economy ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Single economy entry',
    type: Economy,
  })
  async getEconomyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Economy | null> {
    try {
      return this.economyService.getEconomyById(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during fetching economy by ID',
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new economy entry' })
  @ApiBody({ type: EconomyCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Economy entry created',
    type: Economy,
  })
  async createEconomy(@Body() economy: EconomyCreateDTO): Promise<Economy> {
    try {
      return this.economyService.createEconomy(economy);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during creating economy',
      );
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an economy entry by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: EconomyUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Economy entry updated',
    type: Economy,
  })
  async updateEconomy(
    @Param('id', ParseIntPipe) id: number,
    @Body() economy: EconomyUpdateDTO,
  ): Promise<Economy | null> {
    try {
      return this.economyService.updateEconomy(id, economy);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during updating economy',
      );
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an economy entry by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Economy entry deleted' })
  async deleteEconomy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      return this.economyService.deleteEconomy(id);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error during deleting economy',
      );
    }
  }
}
