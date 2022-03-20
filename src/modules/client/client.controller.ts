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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Client } from '../../../entities/Client.entity';
import { Request } from 'express';
import { ClientService } from './client.service';
import { DeleteResult } from 'typeorm';
import { ParseOrderByPipeClients, ParseOrderPipeClients } from './client.pipes';
import { PageResponse } from 'src/constants/PageResponse';

@Controller('/client')
@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized User' })
@ApiBadRequestResponse({ description: 'Bad Request' })
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/:clientId')
  @ApiOperation({summary: 'Retrieve details about an existing Client'})
  @ApiOkResponse({ description: 'All info of a User', type: Client })
  async getClientInfoById(
    @Param('clientId', ParseUUIDPipe) clientId: string
  ): Promise<Client> {
    return this.clientService.getClientInfoById(clientId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all Users based on its Id' })
  @ApiOkResponse({ description: 'All info of all Users', type: Client })
  async find(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseOrderPipeClients) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseOrderByPipeClients) orderBy: string
  ): Promise<PageResponse<Client>> {
    return this.clientService.find(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ description: 'User correctly updated', type: Client })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Client
  ): Promise<Client> {
    return this.clientService.update(id, user, (user as any).companyId);
  }


  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user based on User ID' })
  @ApiOkResponse({
    description: 'Delete user based on User ID',
    type: DeleteResult,
  })
  async delete(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.clientService.delete(id, (user as any).company.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ description: 'User correctly created', type: Client })
  async create(
    @Req() { user }: Request,
    @Body() userBody: Client
  ): Promise<Client> {
    return this.clientService.save(userBody, (user as any).company.id);
  }
}
