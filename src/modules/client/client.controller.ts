import { 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseUUIDPipe, 
  Post, 
  Put, 
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
import { ClientService } from './client.service';
import { DeleteResult } from 'typeorm';

@Controller('/clients')
@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized User' })
@ApiBadRequestResponse({ description: 'Bad Request' })
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/:clientId')
  @ApiOperation({ summary: 'Retrieve details about an existing Client' })
  @ApiOkResponse({ description: 'Success', type: Client })
  async getClient(
    @Param('clientId', new ParseUUIDPipe()) clientId: string
    ): Promise<Client> {
    return this.clientService.getClientByEmail(clientId);
  }

  @Get()
  @ApiOperation({summary: 'Retrieve details about an existing Client'})
  

  @Put('/:clientId')
  @ApiOperation({ summary: 'Retrieve details about an existing Client' })
  @ApiOkResponse({ description: 'Success', type: Client })
  async updateClient(
    @Param('clientId', new ParseUUIDPipe()) clientId: string
    ): Promise<Client> {
    return this.clientService.getClientByEmail(clientId);
  }
  
  @Post('/')
  @ApiOperation({ summary: 'Retrieve details about an existing Client' })
  @ApiOkResponse({ description: 'Success', type: Client })
  async setClient(
    @Param('clientId', new ParseUUIDPipe()) clientId: string
    ): Promise<Client> {
    return this.clientService.getClientByEmail(clientId);
  }

  @Delete('/:clientId')
  @ApiOperation({ summary: 'Delete an existing Client' })
  @ApiOkResponse({ description: 'Delete client based in Client Id', type: DeleteResult })
  async deleteClient(
    @Param('clientId', new ParseUUIDPipe()) clientId: string
    ): Promise<DeleteResult> {
    return this.clientService.deleteClientById(clientId, (clientId as any).company.id);
  }

}
