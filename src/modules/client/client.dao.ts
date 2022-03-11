import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../../../entities/Client.entity';

@Injectable()
export class ClientDAO {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>
  ) {}

  async getUserInfoById(clientId: string): Promise<Client> {
    return this.repository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.company', 'company')
      .where('client.id = :clientId', { clientId })
      .getOne();
  }

  async getClientByEmail(email: string): Promise<Client> {
    return this.repository
      .createQueryBuilder('client')
      .where('client.email = :email', { email })
      .getOne();
  }
}
