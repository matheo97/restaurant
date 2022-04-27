import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from '../../constants/DefaultPageParams';
import { PageResponse } from '../../constants/PageResponse';
import { Order } from '../../../entities/Order.entity';

@Injectable()
export class OrderDao {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>
  ) {}

  async saveOrder(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  async getOrderById(orderId: string, companyId: string): Promise<Order> {
    return this.repository
      .createQueryBuilder('order')
      .where('order.id = :orderId', { orderId })
      .andWhere('order.company_id = :companyId', { companyId })
      .getOne();
  }

  async findOrder(
    companyId: string,
    page = DEFAULT_PAGE_NO,
    pageSize = DEFAULT_PAGE_SIZE,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Order>> {
    const query = this.repository
      .createQueryBuilder('order')
      .where('order.companyId = :companyId', { companyId });
    if (searchCriteria) {
      query.andWhere(
        new Brackets(qb => {
          // Update this code once the customer is merged to include the filter by customer name
          qb.where(
            'order.client_id = client.id and client.name ILIKE :searchCriteria',
            {
              searchCriteria: `%${searchCriteria}%`,
            }
          );

          ['status', 'companyId', 'userId'].forEach(column => {
            qb.orWhere(`order.${column} ILIKE :searchCriteria`, {
              searchCriteria: `%${searchCriteria}%`,
            });
          });
        })
      );
    }

    const [orders, total] = await query
      .orderBy(`order.${orderBy}`, order)
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      results: orders,
      total,
    };
  }

  async deleteOrder(id: string, companyId: string): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where('id = :id', { id })
      .andWhere('companyId = :companyId', { companyId })
      .execute();
  }
}
