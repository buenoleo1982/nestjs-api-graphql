import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTableNullableFields1734580916056 implements MigrationInterface {
    name = 'CreateUserTableNullableFields1734580916056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" MODIFY "role" varchar2(20) DEFAULT 'USER' `);
        await queryRunner.query(`ALTER TABLE "users" MODIFY "deleted_at" timestamp  NULL`);
        await queryRunner.query(`ALTER TABLE "users" MODIFY "last_login" timestamp  NULL`);
        await queryRunner.query(`ALTER TABLE "users" MODIFY "last_login_ip" varchar2(255)  NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" MODIFY "last_login_ip" varchar2(255)  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" MODIFY "last_login" timestamp  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" MODIFY "deleted_at" timestamp  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" MODIFY "role" varchar2(20) DEFAULT 'user' `);
    }

}
