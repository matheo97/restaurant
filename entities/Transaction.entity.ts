import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsDefined, IsUUID, IsOptional, Length } from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Auditable } from './Auditable';
import { Company } from './Company.entity';
import { User } from './User.entity';
import { Order } from './Order.entity';
import { TransactionEnum } from '../src/modules/transaction/transaction.enum';

@Entity('transaction')
export class Transaction extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'Transaction Identifier' })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'The payment code provided by the payment gateway.',
    nullable: false,
    type: String,
  })
  code?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'Status of the transaction.',
    nullable: false,
    type: String,
    enum: TransactionEnum,
  })
  status?: TransactionEnum;

  @Column({ name: 'order_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Order Id' })
  orderId?: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  @ApiHideProperty()
  order?: Order;

  @Column({ name: 'user_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'User Id' })
  userId?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @ApiHideProperty()
  user?: User;

  @Column({ name: 'company_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Company Id' })
  companyId?: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  @ApiHideProperty()
  company?: Company;
}
