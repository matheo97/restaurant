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
        .createQueryBuilder('expenseitem')
        .where('expenseitem.id = :id', {id});

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

    async findExpenseItem(
        companyId: string,
        page = DEFAULT_PAGE_NO,
        pageSize = DEFAULT_PAGE_SIZE,
        searchCriteria: string,
        order: 'ASC' | 'DESC',
        orderBy: string
      ): Promise<PageResponse<ExpenseItem>> {
          const query = this.repository
          .createQueryBuilder('expenseitem')
          .leftJoinAndSelect('expenseitem.expense','expense')
          .where('expense.companyId = :companyId', {companyId});

          if (searchCriteria) {
              query.andWhere(
                  new Brackets(qb => {
                      qb.where('expenseitem.description ILIKE :searchCriteria', {
                          searchCriteria: `%${searchCriteria}%`,
                      });

                      ['cost'].forEach(column => {
                          qb.orWhere(`expenseitem.${column} ILIKE :searchCriteria`, {
                              searchCriteria: `%${searchCriteria}%`,
                          });
                      });
                  })
              );
          }

          const [expenseItems, total] = await query
          .orderBy(`expenseitem.${orderBy}`,order)
          .skip(pageSize && page ? pageSize * (page -1) : 0)
          .take(pageSize || 0)
          .getManyAndCount();

          return {
              results : expenseItems,
              total,
          };
      } 
    
}