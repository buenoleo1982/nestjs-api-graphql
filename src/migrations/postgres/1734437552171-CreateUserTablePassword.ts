import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTablePassword1734437552171 implements MigrationInterface {
    name = 'CreateUserTablePassword1734437552171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "passhash" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "password" TO "passhash"`);
    }

}
