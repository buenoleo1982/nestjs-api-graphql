import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTableNullableFields1734580921687 implements MigrationInterface {
    name = 'CreateUserTableNullableFields1734580921687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'USER' FOR "role"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" datetime`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_login" datetime`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_login_ip" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_login_ip" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_login" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'user' FOR "role"`);
    }

}
