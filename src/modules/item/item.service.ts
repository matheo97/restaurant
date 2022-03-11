import { Injectable } from '@nestjs/common';
import { ItemDao } from './item.dao';
import { Item } from '../../../entities/Item.entity';
@Injectable()
export class ItemService {
  constructor(private readonly itemDao: ItemDao) {}

  async getItemById(itemId: string): Promise<Item> {
    return this.itemDao.getItemById(itemId);
  }
}
