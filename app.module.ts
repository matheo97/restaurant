import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientsModule,
  AuthModule,
  UserModule,
  ItemModule,
  CustomerModule,
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
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
