import { Injectable } from "@nestjs/common";
import { Expense } from "entities/Expense.entity";
import { ExpenseDAO } from "./expense.dao";

@Injectable()
export class ExpenseService{
    constructor(private readonly expenseDao: ExpenseDAO){}

    async getExpenseInfoById(id: string, companyId?: string): Promise<Expense>{
        return this.expenseDao.getExpenseInfoById(id,companyId);
    }
}