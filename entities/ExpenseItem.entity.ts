import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsCurrency, IsDefined, IsOptional, IsUUID, Length } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Auditable } from "./Auditable";
import { Expense } from "./Expense.entity";

@Entity('expenseitem')
export class ExpenseItem extends Auditable{
    @PrimaryColumn({ name: 'id' })
    @IsOptional()
    @IsUUID()
    @ApiProperty({description: 'ExpenseItem Identifier'})
    id?: string;

    @Column()
    @IsDefined()
    @Length(2, 255)
    @ApiProperty({description: 'ExpenseItem Description', minLength: 2, maxLength: 255})
    description: string;

    @Column()
    @IsOptional()
    @IsCurrency()
    @Length(0, 255)
    @ApiPropertyOptional({description:'ExpenseItem Cost', maxLength: 255})
    cost?: string;
  
    @ManyToOne(() => Expense)
    @JoinColumn({ name: 'id' })
    @ApiHideProperty()
    expense?: Expense;

}