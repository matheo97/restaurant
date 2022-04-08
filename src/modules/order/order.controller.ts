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
import { OrderService } from './order.service';
import { User } from '../../../entities/User.entity';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import { ParseOrderByPipeOrders, ParseOrderPipeOrders } from './order.pipes';
import RoleGuard from '../auth/roles.guard';
import { UserRoleType } from '../user/user.enum';
import { Order } from '../../../entities/Order.entity';

@Controller('/order')
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(
  RoleGuard([UserRoleType.ADMIN, UserRoleType.WAITER, UserRoleType.USER])
)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Upsert an Order' })
  @ApiOkResponse({ description: 'Upsert an Order', type: Order })
  async createOrder(
    @Body() order: Order,
    @Req() { user }: Request
  ): Promise<Order> {
    return this.orderService.createOrder(order, (user as User).companyId);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Upsert an Order' })
  @ApiOkResponse({ description: 'Upsert an Order', type: Order })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Request,
    @Body() order: Order
  ): Promise<Order> {
    return this.orderService.updateOrder(id, order, (user as User).companyId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all Order information by id' })
  @ApiOkResponse({ description: 'All Order information', type: Order })
  async getItemById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Request
  ): Promise<Order> {
    return this.orderService.getOrderById(id, (user as User).companyId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete order based on Order ID' })
  @ApiOkResponse({
    description: 'Delete order based on Order ID',
    type: DeleteResult,
  })
  async deleteOrder(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.orderService.deleteOrder(id, (user as any).company.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all Orders based on filters' })
  @ApiOkResponse({ description: 'All info of all Orders', type: Order })
  async findOrder(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseOrderPipeOrders) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseOrderByPipeOrders) orderBy: string
  ): Promise<PageResponse<Order>> {
    return this.orderService.findOrder(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
