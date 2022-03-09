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
  IsHash,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Auditable } from './Auditable';
import { Company } from './Company.entity';

@Entity('user')
export class User extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'User Identifier' })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({ description: 'User Name', minLength: 2, maxLength: 255 })
  name: string;

  @Column({ name: 'last_name' })
  @IsOptional()
  @Length(0, 255)
  @ApiPropertyOptional({ description: 'User Last Name', maxLength: 255 })
  lastName?: string;

  @Column()
  @IsOptional()
  @IsEmail()
  @Length(0, 255)
  @ApiPropertyOptional({ description: 'User Email', maxLength: 255 })
  email?: string;

  @Column()
  @IsOptional()
  @IsPhoneNumber()
  @Length(0, 10)
  @ApiPropertyOptional({ description: 'User Phone', maxLength: 10 })
  phone?: string;

  @Column()
  @IsOptional()
  @IsHash('sha256')
  @Length(8, 100)
  @ApiProperty({
    description: 'Password for the user',
    nullable: true,
    type: String,
  })
  password?: string;

  @Column({ name: 'company_id' })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Company Id' })
  companyId?: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  @ApiHideProperty()
  company?: Company;
}
