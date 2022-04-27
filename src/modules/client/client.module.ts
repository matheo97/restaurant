import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from '../../../entities/Client.entity';
import { ClientDAO } from './client.dao';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientService, ClientDAO],
  controllers: [ClientController],
  exports: [],
})
export class ClientModule {}
