import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTablePassword1734437553950
  implements MigrationInterface
{
  name = 'CreateUserTablePassword1734437553950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `EXEC sp_rename "local.dbo.users.passhash", "password"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" nvarchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" nvarchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `EXEC sp_rename "local.dbo.users.password", "passhash"`,
    );
  }
}
