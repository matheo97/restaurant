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
import { Expense } from 'entities/Expense.entity';
import { User } from 'entities/User.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExpenseService } from './expense.service';
import { Request } from 'express';

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

}