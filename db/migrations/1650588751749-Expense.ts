import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Expense1650588751749 implements MigrationInterface {
    name = 'Expense1650588751749'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
              name: 'expense',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'uuid',
                },
                {
                  name: 'description',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'cost',
                  type: 'varchar',
                  length: '255',
                  isNullable: true,
                },
                {
                  name: 'frecuency',
                  type: 'varchar',
                  length: '255',
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
                  name: 'expense_company_key',
                  columnNames: ['company_id'],
                  referencedTableName: 'company',
                  referencedColumnNames: ['id'],
                },
              ],
            }),
            true
          );   
        }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('expense', 'expense_company_key');
        await queryRunner.dropTable('expense', true);
        
    }

}
