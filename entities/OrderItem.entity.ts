import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsUUID, IsOptional } from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Auditable } from './Auditable';
import { Order } from './Order.entity';
import { Item } from './Item.entity';

@Entity('orderItem')
export class OrderItem extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'OrderItem Identifier' })
  id?: string;

  @Column({ name: 'order_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Order Id' })
  orderId?: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  @ApiHideProperty()
  order?: Order;

  @Column({ name: 'item_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Item Id' })
  itemId?: string;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  @ApiHideProperty()
  item?: Item;
}
