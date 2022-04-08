import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientsModule,
  AuthModule,
  UserModule,
  ItemModule,
  OrderItemModule,
  OrderModule,
} from './src/modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    ClientsModule,
    AuthModule,
    UserModule,
    ItemModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
