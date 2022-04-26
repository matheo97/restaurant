import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionDao } from './transaction.dao';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import { Transaction } from '../../../entities/Transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionDao: TransactionDao) {}

  async createTransaction(
    transaction: Transaction,
    companyId: string
  ): Promise<Transaction> {
    return this.transactionDao.saveTransaction({ ...transaction, companyId });
  }

  async updateTransaction(
    id: string,
    order: Transaction,
    companyId: string
  ): Promise<Transaction> {
    const existingTransaction = await this.transactionDao.getTransactionById(
      id,
      companyId
    );
    if (!existingTransaction) {
      throw new BadRequestException('El Order no existe');
    }
    return this.transactionDao.saveTransaction({ ...order, id });
  }

  async getTransactionsByStatus(
    status: string,
    companyId: string
  ): Promise<Transaction[]> {
    return this.transactionDao.getTransactionsByStatus(status, companyId);
  }

  async getTransactionById(
    transactionId: string,
    companyId: string
  ): Promise<Transaction> {
    return this.transactionDao.getTransactionById(transactionId, companyId);
  }

  async deleteTransaction(
    id: string,
    companyId: string
  ): Promise<DeleteResult> {
    return this.transactionDao.deleteTransaction(id, companyId);
  }

  async findTransaction(
    companyId: string,
    page: number,
    pageSize: number,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Transaction>> {
    return this.transactionDao.findTransaction(
      companyId,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
