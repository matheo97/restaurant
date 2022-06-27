import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpenseItem } from "../../../entities/ExpenseItem.entity";
import { ExpenseItemController } from "./expenseitem.controller";
import { ExpenseItemDAO } from "./expenseitem.dao";
import { ExpenseItemService } from "./expenseitem.service";


@Module({
    imports: [TypeOrmModule.forFeature([ExpenseItem])],
    providers: [ExpenseItemService, ExpenseItemDAO],
    controllers: [ExpenseItemController],
    exports: [ExpenseItemService],    
})
export class ExpenseItemModule {}