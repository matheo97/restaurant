import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from '../../constants/DefaultPageParams';
import { PageResponse } from '../../constants/PageResponse';
import { OrderItem } from '../../../entities/OrderItem.entity';

@Injectable()
export class OrderItemDao {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repository: Repository<OrderItem>
  ) {}

  async saveOrderItem(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository.save(orderItem);
  }

  async getOrderItemById(
    orderItemId: string,
    companyId: string
  ): Promise<OrderItem> {
    return this.repository
      .createQueryBuilder('orderItem')
      .where('orderItem.id = :orderItemId', { orderItemId })
      .andWhere('orderItem.company_id = :companyId', { companyId })
      .getOne();
  }

  async getOrderItemByOrderId(
    orderId: string,
    companyId: string
  ): Promise<OrderItem> {
    return this.repository
      .createQueryBuilder('orderItem')
      .where('orderItem.order_id = :orderId', { orderId })
      .andWhere('orderItem.company_id = :companyId', { companyId })
      .getOne();
  }

  async getOrderItemByItemId(
    itemId: string,
    companyId: string
  ): Promise<OrderItem> {
    return this.repository
      .createQueryBuilder('orderItem')
      .where('orderItem.item_id = :itemId', { itemId })
      .andWhere('orderItem.company_id = :companyId', { companyId })
      .getOne();
  }

  async findOrderItem(
    companyId: string,
    page = DEFAULT_PAGE_NO,
    pageSize = DEFAULT_PAGE_SIZE,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<OrderItem>> {
    const query = this.repository
      .createQueryBuilder('orderItem')
      .where('orderItem.companyId = :companyId', { companyId });
    if (searchCriteria) {
      query.andWhere(
        new Brackets(qb => {
          ['orderId', 'itemId'].forEach(column => {
            qb.orWhere(`orderItem.${column} ILIKE :searchCriteria`, {
              searchCriteria: `%${searchCriteria}%`,
            });
          });
        })
      );
    }

    const [orderItems, total] = await query
      .orderBy(`orderItems.${orderBy}`, order)
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      results: orderItems,
      total,
    };
  }

  async deleteOrderItem(id: string, companyId: string): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(OrderItem)
      .where('id = :id', { id })
      .andWhere('companyId = :companyId', { companyId })
      .execute();
  }
}
