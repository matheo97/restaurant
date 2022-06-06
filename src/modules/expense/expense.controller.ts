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
    UseGuards
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';
import { Expense } from "../../../entities/Expense.entity";
import { User } from 'entities/User.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExpenseService } from './expense.service';
import { Request } from 'express';
import { ParseOrderByPipeClients } from './expense.pipes';
import { PageResponse } from 'src/constants/PageResponse';
import { DeleteResult } from 'typeorm';

@Controller('/expense')
@ApiTags('Expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized User' })
@ApiBadRequestResponse({ description: 'Bad Request' })
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService){}

  @Get('/:expenseId')
  @ApiOperation({summary: 'Retrieve details about an existing Expense'})
  @ApiOkResponse({description: 'All info of an expense', type: Expense})
  async getExpenseInfoById(
    @Param('expenseId', ParseUUIDPipe) expenseId: string,
    @Req() {user }: Request
  ): Promise<Expense>{
    return this.expenseService.getExpenseInfoById(expenseId, (user as User).companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all Expenses based on its Id'})
  @ApiOkResponse({ description: 'All info of all Expenses', type: Expense})
  async find(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseOrderByPipeClients) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseOrderByPipeClients) orderBy: string
  ): Promise<PageResponse<Expense>>{
    return this.expenseService.findExpense(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }

  @Put('/:id')
  @ApiOperation({summary: 'Update expense'})
  @ApiOkResponse({description: 'Expense correctly updated', type: Expense})
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() expense: Expense
  ): Promise<Expense>{
    return this.expenseService.update(id, expense, (expense as any).companyId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete expense based on Expense ID'})
  @ApiOkResponse({
    description: 'Delete expense based on Expense ID',
    type: DeleteResult,
  })
  async delete(
    @Req() {user}: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.expenseService.deleteExpense(id, (user as any).company.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create expense'})
  @ApiOkResponse({ description: 'Expense correctly created', type: Expense})
  async created(
    @Req() {user}: Request,
    @Body() expenseBody: Expense
  ): Promise<Expense>{
    return this.expenseService.createExpense(expenseBody, (user as any).companyId);
  }

}