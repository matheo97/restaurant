import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { DeleteResult } from 'typeorm';
import { User } from '../../../entities/User.entity';
import { PageResponse } from '../../constants/PageResponse';
import { UserDAO } from './user.dao';
@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDAO) {}

  async getUserInfoById(id: string, companyId?: string): Promise<User> {
    return this.userDao.getUserInfoById(id, companyId);
  }

  async getUserByEmail(
    email: string,
    companyId?: string,
    password?: boolean
  ): Promise<User> {
    return this.userDao.getUserByEmail(email, companyId, password);
  }

  async update(id: string, user: User, companyId: string): Promise<User> {
    const existingUser = await this.getUserInfoById(id, companyId);

    if (!existingUser) {
      throw new NotFoundException('El usuario enviado no existe');
    }

    if (user.email) {
      const existingUserByEmail = await this.getUserByEmail(
        user.email,
        companyId
      );

      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new BadRequestException(
          `Usuario con email '(${user.email})' ya existe`
        );
      }
    }

    return this.userDao.save({
      ...user,
      id,
    });
  }

  async save(user: User, companyId: string): Promise<User> {
    const existingUser = await this.getUserByEmail(user.email, companyId);

    if (existingUser) {
      throw new NotFoundException(
        `Usuario con email '(${user.email})' ya existe`
      );
    }

    const salt = genSaltSync(+process.env.PASSWORD_SALT_ROUNDS);

    return this.userDao.save({
      ...user,
      companyId,
      password: user.password ? hashSync(user.password, salt) : undefined,
    });
  }

  async delete(id: string, companyId: string): Promise<DeleteResult> {
    return this.userDao.delete(id, companyId);
  }

  async find(
    companyId: string,
    page: number,
    pageSize: number,
    searchCriteria: string,
    order: 'ASC' | 'DESC',
    orderBy: string
  ): Promise<PageResponse<User>> {
    return this.userDao.find(
      companyId,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }
}
