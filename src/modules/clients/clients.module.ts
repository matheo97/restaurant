import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { User } from '../../../entities/User.entity';
import { ClientsDAO } from './clients.dao';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ClientsService, ClientsDAO],
  controllers: [ClientsController],
  exports: [],
})
export class ClientsModule {}
