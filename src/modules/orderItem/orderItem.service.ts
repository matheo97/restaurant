import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItemDao } from './orderItem.dao';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import { OrderItem } from '../../../entities/OrderItem.entity';

@Injectable()
export class OrderItemService {
  constructor(private readonly orderItemDao: OrderItemDao) {}

  async createOrderItem(
    orderItem: OrderItem,
    companyId: string
  ): Promise<OrderItem> {
    return this.orderItemDao.saveOrderItem({ ...orderItem, companyId });
  }

  async updateOrderItem(
    id: string,
    orderItem: OrderItem,
    companyId: string
  ): Promise<OrderItem> {
    const existingOrderItem = await this.orderItemDao.getOrderItemById(
      id,
      companyId
    );
    if (!existingOrderItem) {
      throw new BadRequestException('El orderItem no existe');
    }
    return this.orderItemDao.saveOrderItem({ ...orderItem, id });
  }

  async getOrderItemById(id: string, companyId: string): Promise<OrderItem> {
    return this.orderItemDao.getOrderItemById(id, companyId);
  }

  async getOrderItemByItemId(
    itemId: string,
    companyId: string
  ): Promise<OrderItem> {
    return this.orderItemDao.getOrderItemByItemId(itemId, companyId);
  }

  async getOrderItemByOrderId(
    orderId: string,
    companyId: string
  ): Promise<OrderItem> {
    return this.orderItemDao.getOrderItemByOrderId(orderId, companyId);
  }

  async deleteOrderItem(id: string, companyId: string): Promise<DeleteResult> {
    return this.orderItemDao.deleteOrderItem(id, companyId);
  }

  async findOrderItem(
    companyId: string,
    page: number,
    pageSize: number,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<OrderItem>> {
    return this.orderItemDao.findOrderItem(
      companyId,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
