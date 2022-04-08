import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsDefined,
  IsEmail,
  IsUUID,
  IsOptional,
  Length,
  IsPhoneNumber,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Auditable } from './Auditable';
import { Company } from './Company.entity';

@Entity('client')
export class Client extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'Client Identifier' })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({ description: 'Client Name', minLength: 2, maxLength: 255 })
  name: string;

  @Column({ name: 'last_name' })
  @IsOptional()
  @Length(0, 255)
  @ApiPropertyOptional({ description: 'Client Last Name', maxLength: 255 })
  lastName?: string;

  @Column()
  @IsOptional()
  @IsEmail()
  @Length(0, 255)
  @ApiPropertyOptional({ description: 'Client Email', maxLength: 255 })
  email?: string;

  @Column()
  @IsOptional()
  @IsEmail()
  @Length(0, 255)
  @ApiPropertyOptional({ description: 'Client Address', maxLength: 255 })
  address?: string;


  @Column()
  @IsOptional()
  @IsPhoneNumber()
  @Length(0, 10)
  @ApiPropertyOptional({ description: 'Client Phone', maxLength: 10 })
  phone?: string;


  @Column({ name: 'company_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Company Id' })
  companyId?: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  @ApiHideProperty()
  company?: Company;
}
