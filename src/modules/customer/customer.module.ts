import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerDao } from './customer.dao';
import { Item } from '../../../entities/Item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [CustomerService, CustomerDao],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
