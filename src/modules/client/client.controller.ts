import { 
  Controller, 
  Get, 
  Param, 
  ParseUUIDPipe, 
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
  async getUser(
    @Param('clientId', new ParseUUIDPipe()) clientId: string
    ): Promise<Client> {
    return this.clientService.getClientByEmail(clientId);
  }
}
