import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/User.entity';
import { PageResponse } from '../../constants/PageResponse';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from '../../constants/DefaultPageParams';

@Injectable()
export class UserDAO {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async getUserInfoById(userId: string, companyId?: string): Promise<User> {
    const query = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .where('user.id = :userId', { userId });

    if (companyId) {
      query.andWhere('user.companyId = :companyId', { companyId });
    }

    return query.getOne();
  }

  async getUserByEmail(email: string, companyId?: string): Promise<User> {
    const query = this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (companyId) {
      query.andWhere('user.companyId = :companyId', { companyId });
    }

    return query.getOne();
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async delete(id: string, companyId: string): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .andWhere('companyId = :companyId', { companyId })
      .execute();
  }

  async find(
    companyId: string,
    page = DEFAULT_PAGE_NO,
    pageSize = DEFAULT_PAGE_SIZE,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<User>> {
    const query = this.repository
      .createQueryBuilder('user')
      .where('user.companyId = :companyId', { companyId });

    if (searchCriteria) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('user.name ILIKE :searchCriteria', {
            searchCriteria: `%${searchCriteria}%`,
          });

          ['lastName', 'email', 'phone', 'role'].forEach(column => {
            qb.orWhere(`user.${column} ILIKE :searchCriteria`, {
              searchCriteria: `%${searchCriteria}%`,
            });
          });
        })
      );
    }

    const [users, total] = await query
      .orderBy(`user.${orderBy}`, order)
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      results: users,
      total,
    };
  }
}
