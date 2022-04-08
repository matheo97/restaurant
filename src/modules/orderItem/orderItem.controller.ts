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
import { OrderItemService } from './orderItem.service';
import { User } from '../../../entities/User.entity';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import {
  ParseOrderByPipeOrderItems,
  ParseOrderPipeOrderItems,
} from './orderItem.pipes';
import RoleGuard from '../auth/roles.guard';
import { UserRoleType } from '../user/user.enum';
import { OrderItem } from '../../../entities/OrderItem.entity';

@Controller('/orderItem')
@ApiTags('OrderItems')
@ApiBearerAuth()
@UseGuards(
  RoleGuard([UserRoleType.ADMIN, UserRoleType.WAITER, UserRoleType.USER])
)
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Upsert an OrderItem' })
  @ApiOkResponse({ description: 'Upsert an OrderItem', type: OrderItem })
  async createOrderItem(
    @Body() orderItem: OrderItem,
    @Req() { user }: Request
  ): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(
      orderItem,
      (user as User).companyId
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Upsert an OrderItem' })
  @ApiOkResponse({ description: 'Upsert an OrderItem', type: OrderItem })
  async updateOrderItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Request,
    @Body() orderItem: OrderItem
  ): Promise<OrderItem> {
    return this.orderItemService.updateOrderItem(
      id,
      orderItem,
      (user as User).companyId
    );
  }

  @Get('/:orderItemId')
  @ApiOperation({ summary: 'Get all OrderItem information by id' })
  @ApiOkResponse({ description: 'All OrderItem information', type: OrderItem })
  async getOrderItemById(
    @Param('orderItemId', ParseUUIDPipe) orderItemId: string,
    @Req() { user }: Request
  ): Promise<OrderItem> {
    return this.orderItemService.getOrderItemById(
      orderItemId,
      (user as User).companyId
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete OrderItem based on OrderItem ID' })
  @ApiOkResponse({
    description: 'Delete OrderItem based on OrderItem ID',
    type: DeleteResult,
  })
  async deleteOrderItem(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.orderItemService.deleteOrderItem(id, (user as any).company.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all OrderItem based on filters' })
  @ApiOkResponse({ description: 'All info of all OrderItem', type: OrderItem })
  async findOrderItem(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseOrderPipeOrderItems) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseOrderByPipeOrderItems) orderBy: string
  ): Promise<PageResponse<OrderItem>> {
    return this.orderItemService.findOrderItem(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
