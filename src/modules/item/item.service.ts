import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemDao } from './item.dao';
import { Item } from '../../../entities/Item.entity';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(private readonly itemDao: ItemDao) {}

  async createItem(item: Item): Promise<Item> {
    return this.itemDao.createItem(item);
  }

  async updateItem(item: Item, companyId: string): Promise<Item> {
    const existingItem = await this.itemDao.getItemById(item.id, companyId);
    if (!existingItem) {
      throw new BadRequestException('El Item no existe');
    }
    return this.itemDao.updateItem({ ...item, companyId });
  }

  async getItemById(itemId: string, companyId: string): Promise<Item> {
    return this.itemDao.getItemById(itemId, companyId);
  }

  async deleteItem(id: string, companyId: string): Promise<DeleteResult> {
    return this.itemDao.deleteItem(id, companyId);
  }

  async findItem(
    companyId: string,
    page: number,
    pageSize: number,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Item>> {
    return this.itemDao.findItem(
      companyId,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
