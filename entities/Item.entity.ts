import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  IsDefined,
  IsUUID,
  IsOptional,
  Length,
  IsDecimal,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Auditable } from './Auditable';
import { Company } from './Company.entity';
import { ItemType } from '../src/modules/item/item.enum';
import { Order } from './Order.entity';

@Entity('item')
export class Item extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'Item Identifier' })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({ description: 'Item Name', minLength: 2, maxLength: 255 })
  name: string;

  @Column()
  @IsDefined()
  @IsDecimal()
  @ApiProperty({
    description: 'Item Cost',
    type: IsDecimal,
    nullable: false,
  })
  cost?: number;

  @Column()
  @IsOptional()
  @Length(2, 255)
  @ApiPropertyOptional({
    description: 'Item Description',
    nullable: true,
    type: String,
  })
  description?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'Item Type',
    nullable: false,
    type: String,
    enum: ItemType,
  })
  type?: string;

  @Column({ name: 'company_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Company Id' })
  companyId?: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  @ApiHideProperty()
  company?: Company;

  @ManyToMany(() => Order)
  @JoinTable({
    name: 'order_item',
    joinColumn: { name: 'item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'order_id', referencedColumnName: 'id' },
  })
  orders?: Order[];
}
