import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { PageResponse } from 'src/constants/PageResponse';
import { DeleteResult } from 'typeorm';
import { Client } from '../../../entities/Client.entity';
import { ClientDAO } from './client.dao';

@Injectable()
export class ClientService {
  constructor(private readonly clientDao: ClientDAO) {}

  async getClientInfoById(id: string, companyId?: string): Promise<Client> {
    return this.clientDao.getUserInfoById(id, companyId);
  }

  async getClientByEmail(email: string, companyId?: string): Promise<Client> {
    return this.clientDao.getUserByEmail(email, companyId);
  }

  async update(id: string, user: Client, companyId: string): Promise<Client> {
    const existingUser = await this.getClientInfoById(id, companyId);

    if (!existingUser) {
      throw new NotFoundException('El usuario enviado no existe');
    }

    if (user.email) {
      const existingUserByEmail = await this.getClientByEmail(
        user.email,
        companyId
      );

      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new BadRequestException(
          `Usuario con email '(${user.email})' ya existe`
        );
      }
    }

    return this.clientDao.save({
      ...user,
      id,
    });
  }

  async save(user: Client, companyId: string): Promise<Client> {
    const existingUser = await this.getClientByEmail(user.email, companyId);

    if (existingUser) {
      throw new NotFoundException(
        `Usuario con email '(${user.email})' ya existe`
      );
    }

    const salt = genSaltSync(+process.env.PASSWORD_SALT_ROUNDS);

    return this.clientDao.save({
      ...user,
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
