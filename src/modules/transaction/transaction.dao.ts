import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from '../../constants/DefaultPageParams';
import { PageResponse } from '../../constants/PageResponse';
import { Transaction } from '../../../entities/Transaction.entity';

@Injectable()
export class TransactionDao {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>
  ) {}

  async saveTransaction(transaction: Transaction): Promise<Transaction> {
    console.log(transaction);
    return this.repository.save(transaction);
  }

  async getTransactionsByStatus(
    status: string,
    companyId: string
  ): Promise<Transaction[]> {
    return this.repository
      .createQueryBuilder('transaction')
      .where('transaction.status = :status', { status })
      .andWhere('transaction.company_id = :companyId', { companyId })
      .getMany();
  }

  async getTransactionById(
    transactionId: string,
    companyId: string
  ): Promise<Transaction> {
    return this.repository
      .createQueryBuilder('transaction')
      .where('transaction.id = :transactionId', { transactionId })
      .andWhere('transaction.company_id = :companyId', { companyId })
      .getOne();
  }

  async findTransaction(
    companyId: string,
    page = DEFAULT_PAGE_NO,
    pageSize = DEFAULT_PAGE_SIZE,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Transaction>> {
    const query = this.repository
      .createQueryBuilder('transaction')
      .where('transaction.companyId = :companyId', { companyId });
    if (searchCriteria) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('transaction.code ILIKE :searchCriteria', {
            searchCriteria: `%${searchCriteria}%`,
          });

          ['status', 'orderId', 'companyId', 'userId'].forEach(column => {
            qb.orWhere(`transaction.${column} ILIKE :searchCriteria`, {
              searchCriteria: `%${searchCriteria}%`,
            });
          });
        })
      );
    }

    const [transactions, total] = await query
      .orderBy(`transaction.${orderBy}`, order)
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      results: transactions,
      total,
    };
  }

  async deleteTransaction(
    id: string,
    companyId: string
  ): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Transaction)
      .where('id = :id', { id })
      .andWhere('companyId = :companyId', { companyId })
      .execute();
  }
}
