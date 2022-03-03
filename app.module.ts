import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './src/modules';
import { entities } from './entities';
import { migrations } from './db/migrations';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database:
        process.env.NODE_ENV === 'test'
          ? process.env.DB_TEST_DATABASE
          : process.env.DB_DATABASE,
      synchronize: false,
      migrationsRun: true,
      migrationsTableName: 'typeorm_migrations',
      migrations,
      entities,
      ...(process.env.DB_SSL && {
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      cli: {
        migrationsDir: 'db/migrations',
      },
    }),
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
