import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "../../../entities/Expense.entity";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "../../../src/constants/DefaultPageParams";
import { PageResponse } from "src/constants/PageResponse";
import { Brackets, DeleteResult, Repository } from "typeorm";

@Injectable()
export class ExpenseDAO {
    constructor(
        @InjectRepository(Expense)
        private readonly repository: Repository<Expense>
    ){}

    async getExpenseInfoById(id: string, companyId?: string): Promise<Expense>{
        const query = this.repository
        .createQueryBuilder('expense')
        .leftJoinAndSelect('expense.company', 'company')
        .where('expense.id = :id', {id});

        if (companyId){
            query.andWhere('expense.companyId = :companyId', {companyId});
        }
        return query.getOne();
    }

    async save(expense: Expense): Promise<Expense> {
        return this. repository.save(expense);
    }

    async delete(id: string, companyId: string): Promise<DeleteResult>{
        return this.repository
        .createQueryBuilder()
        .delete()
        .from(Expense)
        .where('id = :id', { id })
        .andWhere('companyId = :companyId', {companyId})
        .execute();
    }

    async find(
        companyId: string,
        page = DEFAULT_PAGE_NO,
        pageSize = DEFAULT_PAGE_SIZE,
        searchCriteria: string,
        order: 'ASC' | 'DESC',
        orderBy: string
      ): Promise<PageResponse<Expense>> {
          const query = this.repository
            .createQueryBuilder('expense')
            .where('expense.companyId = :companyId', {companyId});
          if (searchCriteria) {
              query.andWhere(
                  new Brackets(qb => {
                      qb.where('expense.description ILIKE :searchCriteria', {
                          searchCriteria: `%${searchCriteria}%`,
                      });

                      ['cost','frecuency'].forEach(column => {
                          qb.orWhere(`expense.${column} ILIKE :searchCriteria`, {
                              searchCriteria: `%${searchCriteria}%`,
                          });
                      });
                  })
              );
          }

          const [expenses, total] = await query
          .orderBy(`expense.${orderBy}`,order)
          .skip(pageSize && page ? pageSize * (page -1) : 0)
          .take(pageSize || 0)
          .getManyAndCount();

          return {
              results : expenses,
              total,
          };
      } 
    
}