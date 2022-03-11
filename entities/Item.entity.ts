import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDefined,
  IsUUID,
  IsOptional,
  Length,
  IsDecimal,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Auditable } from './Auditable';

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
}
