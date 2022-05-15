import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "entities/Expense.entity";
import { PageResponse } from "src/constants/PageResponse";
import { DeleteResult } from "typeorm";
import { ExpenseDAO } from "./expense.dao";

@Injectable()
export class ExpenseService{
    constructor(
        @InjectRepository(Expense)
        private readonly expenseDao: ExpenseDAO){}

    async createExpense(expense: Expense, companyId: string): Promise<Expense>{
        return this.expenseDao.save(expense);
    }

    async update(id: string, expense: Expense, companyId: string): Promise<Expense> {
        const existingExpense = await this.getExpenseInfoById(id, companyId);
        if (!existingExpense) {
            throw new BadRequestException('Expense does not exist');
        }
        return this.expenseDao.save({ ...expense, id});   
    }
    
    async getExpenseInfoById(id: string, companyId?: string): Promise<Expense>{
        return this.expenseDao.getExpenseInfoById(id,companyId);
    }

    async deleteExpense(id: string, companyId?: string): Promise<DeleteResult>{
        return this.expenseDao.delete(id, companyId);
    }

    async findExpense(
        companyId: string,
        page: number,
        pageSize: number,
        searchCriteria: string,
        order: 'ASC' | 'DESC',
        orderBy: string
    ): Promise<PageResponse<Expense>> {
        return this.expenseDao.find(
            companyId,
            page,
            pageSize,
            searchCriteria,
            order,
            orderBy
        );
    }
    
}