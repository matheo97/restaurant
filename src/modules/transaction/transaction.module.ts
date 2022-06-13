import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionDao } from './transaction.dao';
import { Transaction } from '../../../entities/Transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService, TransactionDao],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
