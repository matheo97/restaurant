import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Item } from '../../../entities/Item.entity';
import { ItemService } from './item.service';
import { User } from '../../../entities/User.entity';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import { ParseOrderByPipeItems, ParseOrderPipeItems } from './item.pipes';
import RoleGuard from '../auth/roles.guard';
import { UserRoleType } from '../user/user.enum';

@Controller('/item')
@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(RoleGuard([UserRoleType.ADMIN]))
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOperation({ summary: 'Upsert an Item' })
  @ApiOkResponse({ description: 'Upsert an Item', type: Item })
  async createItem(
    @Body() item: Item,
    @Req() { user }: Request
  ): Promise<Item> {
    return this.itemService.createItem(item, (user as User).companyId);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Upsert an Item' })
  @ApiOkResponse({ description: 'Upsert an Item', type: Item })
  async updateItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Request,
    @Body() item: Item
  ): Promise<Item> {
    return this.itemService.updateItem(id, item, (user as User).companyId);
  }

  @Get('/:itemId')
  @ApiOperation({ summary: 'Get all Item information by id' })
  @ApiOkResponse({ description: 'All Item information', type: Item })
  async getItemById(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Req() { user }: Request
  ): Promise<Item> {
    return this.itemService.getItemById(itemId, (user as User).companyId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete item based on Item ID' })
  @ApiOkResponse({
    description: 'Delete item based on Item ID',
    type: DeleteResult,
  })
  async deleteItem(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.itemService.deleteItem(id, (user as any).company.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all Users based on its Id' })
  @ApiOkResponse({ description: 'All info of all Users', type: User })
  async findItem(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseOrderPipeItems) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseOrderByPipeItems) orderBy: string
  ): Promise<PageResponse<Item>> {
    return this.itemService.findItem(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
