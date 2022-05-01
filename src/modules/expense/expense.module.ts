import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "entities/Expense.entity";
import { ExpenseController } from "./expense.controller";
import { ExpenseDAO } from "./expense.dao";
import { ExpenseService } from "./expense.service";


@Module({
    imports: [TypeOrmModule.forFeature([Expense])],
    providers: [ExpenseService, ExpenseDAO],
    controllers: [ExpenseController],
    exports: [],    
})
export class ExpenseModule {}