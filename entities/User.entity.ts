import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDefined,
  IsEmail,
  IsUUID,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Auditable } from './Auditable';

@Entity('users')
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
}
