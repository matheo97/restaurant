import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from '../../../entities/Client.entity';
import { ClientDAO } from './client.dao';

@Injectable()
export class ClientService {
  constructor(private readonly clientsDao: ClientDAO) {}

  async getClientById(clientId: string): Promise<Client> {
    const client = await this.clientsDao.getUserInfoById(clientId);
    if (!client) {
      throw new NotFoundException(`No user found for id ${clientId}`);
    }
    return client;
  }

  async getClientByEmail(email: string): Promise<Client> {
    return this.clientsDao.getClientByEmail(email);
  }  
}
