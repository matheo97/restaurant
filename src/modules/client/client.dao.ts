import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/User.entity';

@Injectable()
export class ClientDAO {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }
}
