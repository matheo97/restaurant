import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientModule,
  AuthModule,
  UserModule,
  ItemModule,
  ExpenseModule,
  OrderModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
