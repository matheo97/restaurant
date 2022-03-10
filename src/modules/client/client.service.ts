import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../../entities/User.entity';
import { ClientDAO } from './client.dao';

@Injectable()
export class ClientService {
  constructor(private readonly clientsDao: ClientDAO) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.clientsDao.getUserById(id);
    if (!user) {
      throw new NotFoundException(`No user found for id ${id}`);
    }
    return user;
  }
}
