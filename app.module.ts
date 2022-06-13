import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientModule,
  AuthModule,
  UserModule,
  ItemModule,
  ExpenseModule,
  OrderModule,
  ExpenseItemModule,
  TransactionModule,
} from './src/modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    ClientModule,
    AuthModule,
    UserModule,
    ItemModule,
    ExpenseModule,
    OrderModule,
    ExpenseItemModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
