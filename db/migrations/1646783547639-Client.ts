import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { clientSeed } from '../seed/client.seed';

export class Client1646783547639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
              name: 'client',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'uuid',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'last_name',
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
                  name: 'phone',
                  type: 'varchar',
                  length: '10',
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
                  name: 'client_company_key',
                  columnNames: ['company_id'],
                  referencedTableName: 'company',
                  referencedColumnNames: ['id'],
                },
              ],
            }),
            true
          );   
          await queryRunner.manager.getRepository('client').save(clientSeed);
        }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('client', 'client_company_key');
        await queryRunner.dropTable('client', true);
        
    }

}
