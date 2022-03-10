import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../../../entities/User.entity';
import { ClientService } from './client.service';

@Controller('v1/clients')
@ApiTags('Clients')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized User' })
@ApiBadRequestResponse({ description: 'Bad Request' })
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve details about an existing Client' })
  @ApiOkResponse({ description: 'Success', type: User })
  async getUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.service.getUserById(id);
  }
}
