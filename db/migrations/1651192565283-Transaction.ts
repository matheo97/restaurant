import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TransactionEnum } from '../../src/modules/transaction/transaction.enum';

export class Transaction1651192565283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '255',
            isNullable: false,
            enum: [
              TransactionEnum.SUCCESS,
              TransactionEnum.PENDING,
              TransactionEnum.FAILED,
            ],
          },
          {
            name: 'company_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'transaction_company_key',
            columnNames: ['company_id'],
            referencedTableName: 'company',
            referencedColumnNames: ['id'],
          },
          {
            name: 'transaction_client_key',
            columnNames: ['client_id'],
            referencedTableName: 'client',
            referencedColumnNames: ['id'],
          },
          {
            name: 'transaction_user_key',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transaction', 'transaction_company_key');
    await queryRunner.dropForeignKey('transaction', 'transaction_client_key');
    await queryRunner.dropForeignKey('transaction', 'transaction_user_key');
    await queryRunner.dropTable('transaction', true);
  }
}
