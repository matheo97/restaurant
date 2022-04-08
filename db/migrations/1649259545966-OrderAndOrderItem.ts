import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { OrderStatus } from '../../src/modules/order/order.enum';

export class OrderAndOrderItem1649259545966 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '255',
            isNullable: false,
            enum: [OrderStatus.PAID, OrderStatus.OPEN, OrderStatus.REOPENED],
          },
          {
            name: 'subTotal',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'tax',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'discount',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'grandTotal',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'cost',
            type: 'decimal',
            isNullable: false,
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
            name: 'order_company_key',
            columnNames: ['company_id'],
            referencedTableName: 'company',
            referencedColumnNames: ['id'],
          },
          {
            name: 'order_user_key',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'order_item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'company_id',
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
            name: 'order_item_company_key',
            columnNames: ['company_id'],
            referencedTableName: 'company',
            referencedColumnNames: ['id'],
          },
          {
            name: 'order_item_user_key',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            name: 'order_item_order_key',
            columnNames: ['order_id'],
            referencedTableName: 'order',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order_item', 'order_item_company_key');
    await queryRunner.dropForeignKey('order_item', 'order_item_user_key');
    await queryRunner.dropForeignKey('order_item', 'order_item_order_key');
    await queryRunner.dropForeignKey('order', 'order_company_key');
    await queryRunner.dropForeignKey('order', 'order_user_key');
    await queryRunner.dropTable('order_item', true);
    await queryRunner.dropTable('order', true);
  }
}
