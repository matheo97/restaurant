import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../../../entities/Client.entity';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'src/constants/DefaultPageParams';
import { PageResponse } from 'src/constants/PageResponse';

@Injectable()
export class ClientDAO {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>
  ) {}

  async getUserInfoById(clientId: string, companyId?: string): Promise<Client> {
    const query = this.repository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.company', 'company')
      .where('client.id = :clientId', { clientId });

    if (companyId) {
      query.andWhere('user.companyId = :companyId', { companyId });
    }

    return query.getOne();
  }

  async getUserByEmail(email: string, companyId?: string): Promise<Client> {
    const query = this.repository
      .createQueryBuilder('client')
      .where('client.email = :email', { email });

    if (companyId) {
      query.andWhere('client.companyId = :companyId', { companyId });
    }

    return query.getOne();
  }

  async save(user: Client): Promise<Client> {
    return this.repository.save(user);
  }

  async delete(id: string, companyId: string): Promise<DeleteResult> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Client)
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
  ): Promise<PageResponse<Client>> {
    const query = this.repository
      .createQueryBuilder('client')
      .where('client.companyId = :companyId', { companyId });

    if (searchCriteria) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('client.name ILIKE :searchCriteria', {
            searchCriteria: `%${searchCriteria}%`,
          });

          ['lastName', 'email', 'phone', 'role'].forEach(column => {
            qb.orWhere(`client.${column} ILIKE :searchCriteria`, {
              searchCriteria: `%${searchCriteria}%`,
            });
          });
        })
      );
    }

    const [clients, total] = await query
      .orderBy(`user.${orderBy}`, order)
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      results: clients,
      total,
    };
  }
}
