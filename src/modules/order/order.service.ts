import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDao } from './order.dao';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import { Order } from '../../../entities/Order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderDao: OrderDao) {}

  async createOrder(order: Order, companyId: string): Promise<Order> {
    return this.orderDao.saveOrder({ ...order, companyId });
  }

  async updateOrder(
    id: string,
    order: Order,
    companyId: string
  ): Promise<Order> {
    const existingOrder = await this.orderDao.getOrderById(id, companyId);
    if (!existingOrder) {
      throw new BadRequestException('El Order no existe');
    }
    return this.orderDao.saveOrder({ ...order, id });
  }

  async getOrderById(orderId: string, companyId: string): Promise<Order> {
    return this.orderDao.getOrderById(orderId, companyId);
  }

  async deleteOrder(id: string, companyId: string): Promise<DeleteResult> {
    return this.orderDao.deleteOrder(id, companyId);
  }

  async findOrder(
    companyId: string,
    page: number,
    pageSize: number,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Order>> {
    return this.orderDao.findOrder(
      companyId,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
