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
import { User } from './User.entity';
import { OrderStatus } from '../src/modules/order/order.enum';
import { Item } from './Item.entity';
import { Client } from './Client.entity';

@Entity('order')
export class Order extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'Order Identifier' })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'Status',
    nullable: false,
    type: String,
    enum: OrderStatus,
  })
  status?: OrderStatus;

  @Column()
  @IsDefined()
  @IsDecimal()
  @ApiProperty({
    description: 'SubTotal',
    type: IsDecimal,
    nullable: false,
  })
  subTotal?: number;

  @Column()
  @IsDefined()
  @IsDecimal()
  @ApiProperty({
    description: 'Tax',
    type: IsDecimal,
    nullable: false,
  })
  tax?: number;

  @Column()
  @IsDefined()
  @IsDecimal()
  @ApiProperty({
    description: 'Discount',
    type: IsDecimal,
    nullable: false,
  })
  discount?: number;

  @Column()
  @IsDefined()
  @IsDecimal()
  @ApiProperty({
    description: 'GrandTotal',
    type: IsDecimal,
    nullable: false,
  })
  grandTotal?: number;

  @Column({ name: 'company_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Company Id' })
  companyId?: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  @ApiHideProperty()
  company?: Company;

  @Column({ name: 'client_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Client Id' })
  clientId?: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  @ApiHideProperty()
  client?: Client;

  @Column({ name: 'user_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'User Id' })
  userId?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @ApiHideProperty()
  user?: User;

  @ManyToMany(() => Item)
  @JoinTable({
    name: 'order_item',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'item_id', referencedColumnName: 'id' },
  })
  items?: Item[];
}
