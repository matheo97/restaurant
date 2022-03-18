import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from '../../constants/DefaultPageParams';
import { PageResponse } from '../../constants/PageResponse';
import { Customer } from '../../../entities/Customer.entity';

@Injectable()
export class CustomerDao {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>
  ) {}

  async saveCustomer(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }

  async getCustomerById(
    customerId: string,
    companyId: string
  ): Promise<Customer> {
    return this.repository
      .createQueryBuilder('customer')
      .where('customer.id = :customerId', { customerId })
      .andWhere('customer.company_id = :companyId', { companyId })
      .getOne();
  }

  async findCustomer(
    companyId: string,
    page = DEFAULT_PAGE_NO,
    pageSize = DEFAULT_PAGE_SIZE,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Customer>> {
    const query = this.repository
      .createQueryBuilder('customer')
      .where('customer.companyId = :companyId', { companyId });
    if (searchCriteria) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('customer.name ILIKE :searchCriteria', {
            searchCriteria: `%${searchCriteria}%`,
          });

          [
            'firstName',
            'lastName',
            'mobile',
            'line1',
            'email',
            'address',
            'city',
            'country',
          ].forEach(column => {
            qb.orWhere(`customer.${column} ILIKE :searchCriteria`, {
              searchCriteria: `%${searchCriteria}%`,
            });
          });
        })
      );
    }

    const [customers, total] = await query
      .orderBy(`customer.${orderBy}`, order)
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      results: customers,
      total,
    };
  }

  async deleteCustomer(id: string, companyId: string): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Customer)
      .where('id = :id', { id })
      .andWhere('companyId = :companyId', { companyId })
      .execute();
  }
}
