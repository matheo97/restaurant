import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExpenseItem } from "../../../entities/ExpenseItem.entity";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "../../constants/DefaultPageParams";
import { PageResponse } from "src/constants/PageResponse";
import { Brackets, DeleteResult, Repository } from "typeorm";

@Injectable()
export class ExpenseItemDAO {
    constructor(
        @InjectRepository(ExpenseItem)
        private readonly repository: Repository<ExpenseItem>
    ){}

    async getExpenseInfoById(id: string): Promise<ExpenseItem>{
        const query = this.repository
        .createQueryBuilder('expense')
        .where('expense.id = :id', {id});

        return query.getOne();
    }

    async save(expense: ExpenseItem): Promise<ExpenseItem> {
        return this. repository.save(expense);
    }

    async delete(id: string): Promise<DeleteResult>{
        return this.repository
        .createQueryBuilder()
        .delete()
        .from(ExpenseItem)
        .where('id = :id', { id })
        .execute();
    }

    async find(
        id: string,
        page = DEFAULT_PAGE_NO,
        pageSize = DEFAULT_PAGE_SIZE,
        searchCriteria: string,
        order: 'ASC' | 'DESC',
        orderBy: string
      ): Promise<PageResponse<ExpenseItem>> {
          const query = this.repository
          .createQueryBuilder('expenseitem')
          .where('expenseitem.id = :id', {id});

          if (searchCriteria) {
              query.andWhere(
                  new Brackets(qb => {
                      qb.where('expenseitem.name ILIKE :searchCriteria', {
                          searchCriteria: `%${searchCriteria}%`,
                      });

                      ['description',
                      'cost',
                      'createdAt',
                      'updatedAt',].forEach(column => {
                          qb.orWhere(`expenseitem.${column} ILIKE :searchCriteria`, {
                              searchCriteria: `%${searchCriteria}%`,
                          });
                      });
                  })
              );
          }

          const [expenses, total] = await query
          .orderBy(`expenseitem.${orderBy}`,order)
          .skip(pageSize && page ? pageSize * (page -1) : 0)
          .take(pageSize || 0)
          .getManyAndCount();

          return {
              results : expenses,
              total,
          };
      } 
    
}