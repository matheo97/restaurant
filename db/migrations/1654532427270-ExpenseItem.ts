import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ExpenseItem1654532427270 implements MigrationInterface {
    name = 'ExpenseItem1654532427270'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
              name: 'expenseitem',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  length: '255',
                  isPrimary: true,
                  isNullable: false,                },
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
                  name: 'expense_expenseitem_key',
                  columnNames: ['id'],
                  referencedTableName: 'expense',
                  referencedColumnNames: ['id'],
                },
              ],
            }),
            true
          );   
        }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('expenseitem', 'expense_expenseitem_key');
        await queryRunner.dropTable('expenseitem', true);
        
    }

}
