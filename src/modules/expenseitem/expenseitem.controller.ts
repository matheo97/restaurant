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
import { ExpenseItem } from "../../../entities/ExpenseItem.entity";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExpenseItemService } from './expenseitem.service';
import { Request } from 'express';
import { ParseOrderByPipeClients } from './expenseitem.pipes';
import { PageResponse } from 'src/constants/PageResponse';
import { DeleteResult } from 'typeorm';

@Controller('/expenseitem')
@ApiTags('ExpensesItems')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized User' })
@ApiBadRequestResponse({ description: 'Bad Request' })
export class ExpenseItemController {
  constructor(private readonly expenseItemService: ExpenseItemService){}

  @Get('/:expenseitemId')
  @ApiOperation({summary: 'Retrieve details about an existing Expense'})
  @ApiOkResponse({description: 'All info of an expense', type: ExpenseItem})
  async getExpenseInfoById(
    @Param('expenseitemId', ParseUUIDPipe) expenseitemId: string,
  ): Promise<ExpenseItem>{
    return this.expenseItemService.getExpenseInfoById(expenseitemId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all ExpensesItems based on its Id'})
  @ApiOkResponse({ description: 'All info of all ExpensesItems', type: ExpenseItem})
  async find(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseOrderByPipeClients) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseOrderByPipeClients) orderBy: string
  ): Promise<PageResponse<ExpenseItem>>{
    return this.expenseItemService.findExpense(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }

  @Put('/:id')
  @ApiOperation({summary: 'Update expenseItem'})
  @ApiOkResponse({description: 'ExpenseItem correctly updated', type: ExpenseItem})
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() expenseitem: ExpenseItem
  ): Promise<ExpenseItem>{
    return this.expenseItemService.update(id, expenseitem);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete expenseItem based on Expense ID'})
  @ApiOkResponse({
    description: 'Delete expenseItem based on Expense ID',
    type: DeleteResult,
  })
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.expenseItemService.deleteExpense(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create expenseItem'})
  @ApiOkResponse({ description: 'Expense correctly created', type: ExpenseItem})
  async created(
    @Body() expenseItemBody: ExpenseItem
  ): Promise<ExpenseItem>{
    return this.expenseItemService.createExpense(expenseItemBody);
  }

}