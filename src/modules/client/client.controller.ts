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
import { User } from 'entities/User.entity';

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
  @ApiOkResponse({ description: 'All info of a Client', type: Client })
  async getClientInfoById(
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Req() {user }: Request
  ): Promise<Client> {
    return this.clientService.getClientInfoById(clientId, (user as User).companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all Clients based on its Id' })
  @ApiOkResponse({ description: 'All info of all Clients', type: Client })
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
  @ApiOperation({ summary: 'Update client' })
  @ApiOkResponse({ description: 'Client correctly updated', type: Client })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() client: Client
  ): Promise<Client> {
    return this.clientService.update(id, client, (client as any).companyId);
  }


  @Delete('/:id')
  @ApiOperation({ summary: 'Delete client based on Client ID' })
  @ApiOkResponse({
    description: 'Delete client based on Client ID',
    type: DeleteResult,
  })
  async delete(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.clientService.delete(id, (user as any).company.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create client' })
  @ApiOkResponse({ description: 'Client correctly created', type: Client })
  async create(
    @Req() { user }: Request,
    @Body() clientBody: Client
  ): Promise<Client> {
    return this.clientService.save(clientBody, (user as any).company.id);
  }
}
