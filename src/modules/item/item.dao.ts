import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../../entities/Item.entity';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from '../../constants/DefaultPageParams';
import { PageResponse } from '../../constants/PageResponse';

@Injectable()
export class ItemDao {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>
  ) {}

  async createItem(item: Item): Promise<Item> {
    return this.repository.save(item);
  }

  async updateItem(item: Item): Promise<Item> {
    return this.repository.save(item);
  }

  async getItemById(itemId: string, companyId: string): Promise<Item> {
    return this.repository
      .createQueryBuilder('item')
      .where('item.id = :itemId', { itemId })
      .andWhere('item.company_id = :companyId', { companyId })
      .getOne();
  }

  async findItem(
    companyId: string,
    page = DEFAULT_PAGE_NO,
    pageSize = DEFAULT_PAGE_SIZE,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Item>> {
    const query = this.repository
      .createQueryBuilder('item')
      .where('item.companyId = :companyId', { companyId });
    if (searchCriteria) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('item.name ILIKE :searchCriteria', {
            searchCriteria: `%${searchCriteria}%`,
          });

          ['description', 'type', 'cost'].forEach(column => {
            qb.orWhere(`item.${column} ILIKE :searchCriteria`, {
              searchCriteria: `%${searchCriteria}%`,
            });
          });
        })
      );
    }

    const [items, total] = await query
      .orderBy(`item.${orderBy}`, order)
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      results: items,
      total,
    };
  }

  async deleteItem(id: string, companyId: string): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Item)
      .where('id = :id', { id })
      .andWhere('companyId = :companyId', { companyId })
      .execute();
  }
}
