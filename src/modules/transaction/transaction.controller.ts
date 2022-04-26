import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { TransactionService } from './transaction.service';
import { User } from '../../../entities/User.entity';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import {
  ParseTransactionPipeOrders,
  ParseTransactionByPipeOrders,
} from './transaction.pipes';
import RoleGuard from '../auth/roles.guard';
import { UserRoleType } from '../user/user.enum';
import { Transaction } from '../../../entities/Transaction.entity';

@Controller('/transaction')
@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(
  RoleGuard([UserRoleType.ADMIN, UserRoleType.WAITER, UserRoleType.USER])
)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Upsert an Transaction' })
  @ApiOkResponse({ description: 'Upsert an Transaction', type: Transaction })
  async createTransaction(
    @Body() transaction: Transaction,
    @Req() { user }: Request
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(
      transaction,
      (user as User).companyId
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Upsert an Transaction' })
  @ApiOkResponse({ description: 'Upsert an Transaction', type: Transaction })
  async updateTransaction(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Request,
    @Body() transaction: Transaction
  ): Promise<Transaction> {
    return this.transactionService.updateTransaction(
      id,
      transaction,
      (user as User).companyId
    );
  }

  @Get('/:status')
  @ApiOperation({ summary: 'Get all Transaction information by status' })
  @ApiOkResponse({
    description: 'All Transaction information',
    type: Transaction,
  })
  async getTransactionsByStatus(
    @Param('status') status: string,
    @Req() { user }: Request
  ): Promise<Transaction[]> {
    return this.transactionService.getTransactionsByStatus(
      status,
      (user as User).companyId
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all Transaction information by id' })
  @ApiOkResponse({
    description: 'All Transaction information',
    type: Transaction,
  })
  async getTransactionById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Request
  ): Promise<Transaction> {
    return this.transactionService.getTransactionById(
      id,
      (user as User).companyId
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete order based on Order ID' })
  @ApiOkResponse({
    description: 'Delete order based on Order ID',
    type: DeleteResult,
  })
  async deleteTransaction(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.transactionService.deleteTransaction(
      id,
      (user as any).company.id
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all info of all Transactions based on filters',
  })
  @ApiOkResponse({
    description: 'All info of all Transactions',
    type: Transaction,
  })
  async findTransaction(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseTransactionPipeOrders) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseTransactionByPipeOrders) orderBy: string
  ): Promise<PageResponse<Transaction>> {
    return this.transactionService.findTransaction(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
