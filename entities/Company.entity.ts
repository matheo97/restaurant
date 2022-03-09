import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID, IsOptional, Length, IsPhoneNumber } from 'class-validator';
import { Auditable } from './Auditable';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('company')
export class Company extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Unique identifier for Company',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column()
  @Length(2, 255)
  @IsOptional()
  @ApiProperty({
    description: 'Number of Tributary Identification',
    nullable: true,
    type: String,
  })
  nit?: string;

  @Column()
  @Length(2, 255)
  @ApiProperty({
    description: 'Name for the company',
    nullable: true,
    type: String,
  })
  name?: string;

  @Column()
  @Length(0, 255)
  @IsOptional()
  @ApiProperty({
    description: 'Address for the company',
    nullable: true,
    type: String,
  })
  address?: string;

  @Column()
  @IsOptional()
  @IsPhoneNumber()
  @Length(0, 10)
  @ApiPropertyOptional({ description: 'User Phone', maxLength: 10 })
  phone?: string;
}
