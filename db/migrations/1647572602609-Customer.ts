import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Customer1647572602609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'mobile',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'line1',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '255',
            isNullable: true,
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
            name: 'customer_company_key',
            columnNames: ['company_id'],
            referencedTableName: 'company',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('customer', 'customer_company_key');
    await queryRunner.dropTable('customer', true);
  }
}
