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
  IsEmail,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Auditable } from './Auditable';
import { Company } from './Company.entity';

@Entity('customer')
export class Customer extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'Customer Identifier' })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'First name of the customer',
    minLength: 2,
    maxLength: 255,
  })
  firstName: string;

  @Column()
  @IsOptional()
  @Length(2, 255)
  @ApiPropertyOptional({
    description: 'Last name of the customer',
    nullable: true,
    type: String,
  })
  lastName?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'Mobile number of the customer',
    minLength: 2,
    maxLength: 255,
  })
  mobile: string;

  @Column()
  @IsOptional()
  @Length(2, 255)
  @ApiPropertyOptional({
    description: 'Line 1 of the customer',
    nullable: true,
    type: String,
  })
  line1?: string;

  @Column()
  @IsDefined()
  @IsEmail()
  @Length(3, 255)
  @ApiProperty({ description: 'Customer Email', maxLength: 255 })
  email: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'Address of the customer',
    minLength: 2,
    maxLength: 255,
  })
  address: string;

  @Column()
  @IsOptional()
  @Length(2, 255)
  @ApiPropertyOptional({
    description: 'City of the customer address',
    nullable: true,
    type: String,
  })
  city?: string;

  @Column()
  @IsOptional()
  @Length(2, 255)
  @ApiPropertyOptional({
    description: 'Country of the customer Address',
    nullable: true,
    type: String,
  })
  country?: string;

  @Column({ name: 'company_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Company Id' })
  companyId?: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  @ApiHideProperty()
  company?: Company;
}
