import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerDao } from './customer.dao';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import { Customer } from '../../../entities/Customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly customerDao: CustomerDao) {}

  async createCustomer(
    customer: Customer,
    companyId: string
  ): Promise<Customer> {
    return this.customerDao.saveCustomer({ ...customer, companyId });
  }

  async updateCustomer(
    id: string,
    customer: Customer,
    companyId: string
  ): Promise<Customer> {
    const existingItem = await this.customerDao.getCustomerById(id, companyId);
    if (!existingItem) {
      throw new BadRequestException('El Item no existe');
    }
    return this.customerDao.saveCustomer({ ...customer, id });
  }

  async getCustomerById(itemId: string, companyId: string): Promise<Customer> {
    return this.customerDao.getCustomerById(itemId, companyId);
  }

  async deleteCustomer(id: string, companyId: string): Promise<DeleteResult> {
    return this.customerDao.deleteCustomer(id, companyId);
  }

  async findCustomer(
    companyId: string,
    page: number,
    pageSize: number,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Customer>> {
    return this.customerDao.findCustomer(
      companyId,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
