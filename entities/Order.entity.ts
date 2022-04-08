import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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
  status?: string;

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

  @Column({ name: 'user_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'User Id' })
  userId?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @ApiHideProperty()
  user?: User;
}
