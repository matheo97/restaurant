import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemService } from './orderItem.service';
import { OrderItemController } from './orderItem.controller';
import { OrderItemDao } from './orderItem.dao';
import { OrderItem } from '../../../entities/OrderItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemService, OrderItemDao],
  controllers: [OrderItemController],
  exports: [OrderItemService],
})
export class OrderItemModule {}
