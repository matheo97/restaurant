import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PageResponse } from 'src/constants/PageResponse';
import { DeleteResult } from 'typeorm';
import { Client } from '../../../entities/Client.entity';
import { ClientDAO } from './client.dao';

@Injectable()
export class ClientService {
  constructor(private readonly clientDao: ClientDAO) {}

  async getClientInfoById(id: string, companyId?: string): Promise<Client> {
    return this.clientDao.getClientInfoById(id, companyId);
  }

  async getClientByEmail(email: string, companyId?: string): Promise<Client> {
    return this.clientDao.getClientByEmail(email, companyId);
  }

  async update(id: string, client: Client, companyId: string): Promise<Client> {
    const existingUser = await this.getClientInfoById(id, companyId);

    if (!existingUser) {
      throw new NotFoundException('Client sent does not exist');
    }

    if (client.email) {
      const existingUserByEmail = await this.getClientByEmail(
        client.email,
        companyId
      );

      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new BadRequestException(
          `Client with email '(${client.email})' already exist`
        );
      }
    }

    return this.clientDao.save({
      ...client,
      id,
    });
  }

  async save(client: Client, companyId: string): Promise<Client> {
    const existingUser = await this.getClientByEmail(client.email, companyId);

    if (existingUser) {
      throw new NotFoundException(
        `Client with email '(${client.email})'already exist`
      );
    }

    return this.clientDao.save({
      ...client,
      companyId    });
  }

  async delete(id: string, companyId: string): Promise<DeleteResult> {
    return this.clientDao.delete(id, companyId);
  }

  async find(
    companyId: string,
    page: number,
    pageSize: number,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<Client>> {
    return this.clientDao.find(
      companyId,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
