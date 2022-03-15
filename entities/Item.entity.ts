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
  @ApiPropertyOptional({
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
  @IsOptional()
  @Length(2, 255)
  @ApiPropertyOptional({
    description: 'Item Type',
    nullable: true,
    type: String,
    enum: ['DRINK', 'FOOD'],
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
}
