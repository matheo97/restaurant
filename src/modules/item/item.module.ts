import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ItemDao } from './item.dao';
import { Item } from '../../../entities/Item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService, ItemDao],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
