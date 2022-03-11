import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../../entities/Item.entity';

@Injectable()
export class ItemDao {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>
  ) {}

  async getItemById(itemId: string): Promise<Item> {
    return this.repository
      .createQueryBuilder('item')
      .where('item.id = :itemId', { itemId })
      .getOne();
  }
}
