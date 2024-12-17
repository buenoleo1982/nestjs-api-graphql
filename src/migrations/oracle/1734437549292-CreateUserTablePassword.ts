import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTablePassword1734437549292 implements MigrationInterface {
    name = 'CreateUserTablePassword1734437549292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "passhash" TO "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" varchar2(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" varchar2(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "password" TO "passhash"`);
    }

}
