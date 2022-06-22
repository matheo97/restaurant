import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ExpenseItem } from "../../../entities/ExpenseItem.entity";
import { PageResponse } from "src/constants/PageResponse";
import { DeleteResult } from "typeorm";
import { ExpenseItemDAO } from "./expenseitem.dao";

@Injectable()
export class ExpenseItemService{
    constructor(
        private readonly expenseItemDao: ExpenseItemDAO){}

    async createExpense(expenseItem: ExpenseItem): Promise<ExpenseItem>{
        return this.expenseItemDao.save(expenseItem);
    }

    async update(id: string, expenseItem: ExpenseItem): Promise<ExpenseItem> {
        const existingExpense = await this.getExpenseInfoById(id);
        if (!existingExpense) {
            throw new BadRequestException('Expense does not exist');
        }
        return this.expenseItemDao.save({ ...expenseItem, id});   
    }
    
    async getExpenseInfoById(id: string): Promise<ExpenseItem>{
        return this.expenseItemDao.getExpenseInfoById(id);
    }

    async deleteExpense(id: string): Promise<DeleteResult>{
        return this.expenseItemDao.delete(id);
    }

    async findExpense(
        expenseId: string,
        page: number,
        pageSize: number,
        searchCriteria: string,
        order: 'ASC' | 'DESC',
        orderBy: string
    ): Promise<PageResponse<ExpenseItem>> {
        return this.expenseItemDao.findExpenseItem(
            expenseId,
            page,
            pageSize,
            searchCriteria,
            order,
            orderBy
        );
    }
    
}