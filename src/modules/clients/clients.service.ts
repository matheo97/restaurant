import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../../entities/user.entity';
import { ClientsDAO } from './clients.dao';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsDao: ClientsDAO) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.clientsDao.getUserById(id);
    if (!user) {
      throw new NotFoundException(`No user found for id ${id}`);
    }
    return user;
  }
}
