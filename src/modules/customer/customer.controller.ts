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
import { CustomerService } from './customer.service';
import { User } from '../../../entities/User.entity';
import { PageResponse } from '../../constants/PageResponse';
import { DeleteResult } from 'typeorm';
import {
  ParseOrderByPipeCustomers,
  ParseOrderPipeCustomers,
} from './customer.pipes';
import RoleGuard from '../auth/roles.guard';
import { UserRoleType } from '../user/user.enum';
import { Customer } from '../../../entities/Customer.entity';

@Controller('/customer')
@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(
  RoleGuard([UserRoleType.ADMIN, UserRoleType.WAITER, UserRoleType.USER])
)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a Customer' })
  @ApiOkResponse({ description: 'Create a Customer', type: Customer })
  async createCustomer(
    @Body() customer: Customer,
    @Req() { user }: Request
  ): Promise<Customer> {
    return this.customerService.createCustomer(
      customer,
      (user as User).companyId
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a Customer' })
  @ApiOkResponse({ description: 'Update a Customer', type: Customer })
  async updateCustomer(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Request,
    @Body() customer: Customer
  ): Promise<Customer> {
    return this.customerService.updateCustomer(
      id,
      customer,
      (user as User).companyId
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all Customer information by id' })
  @ApiOkResponse({ description: 'All Customer information', type: Customer })
  async getCustomerById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Request
  ): Promise<Customer> {
    return this.customerService.getCustomerById(id, (user as User).companyId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete customer based on Customer ID' })
  @ApiOkResponse({
    description: 'Delete customer based on Customer ID',
    type: DeleteResult,
  })
  async deleteItem(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.customerService.deleteCustomer(id, (user as any).company.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all Customers based on its Id' })
  @ApiOkResponse({ description: 'All info of all Customers', type: Customer })
  async findCustomer(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseOrderPipeCustomers) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseOrderByPipeCustomers) orderBy: string
  ): Promise<PageResponse<Customer>> {
    return this.customerService.findCustomer(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
