import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDao } from './order.dao';
import { Order } from '../../../entities/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, OrderDao],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
