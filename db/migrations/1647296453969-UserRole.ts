import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { UserRoleType } from '../../src/modules/user/user.enum';
import { userSeed } from '../seed/companyUser.seed';

export class UserRole1647296453969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'role',
        type: 'enum',
        enum: [UserRoleType.ADMIN, UserRoleType.WAITER, UserRoleType.USER],
        enumName: 'userRoleType',
        default: `'admin'`,
        isNullable: false,
      })
    );
    await queryRunner.manager.getRepository('user').save(userSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'role');
  }
}
