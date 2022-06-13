import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsCurrency, IsDefined, IsOptional, IsUUID, Length } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auditable } from "./Auditable";
import { Company } from "./Company.entity";

@Entity('expense')
export class Expense extends Auditable{
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    @ApiProperty({description: 'Expense Identifier'})
    id?: string;

    @Column()
    @IsDefined()
    @Length(2, 255)
    @ApiProperty({description: 'Expense Description', minLength: 2, maxLength: 255})
    description: string;

    @Column()
    @IsCurrency()
    @Length(0, 255)
    @ApiPropertyOptional({description:'Expense Cost', maxLength: 255})
    cost?: string;

    @Column()
    @Length(0, 255)
    @ApiPropertyOptional({description:'Expense Frecuency', maxLength: 255})
    frecuency?: string;

    @Column({ name: 'company_id' })
    @ApiPropertyOptional({ description: 'Company Id' })
    companyId?: string;
  
    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    @ApiHideProperty()
    company?: Company;

}