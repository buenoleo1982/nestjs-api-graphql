import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1734429740845 implements MigrationInterface {
    name = 'CreateUserTable1734429740845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "passhash" character varying(255) NOT NULL, "role" character varying(20) NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP NOT NULL, "status" boolean NOT NULL DEFAULT true, "last_login" TIMESTAMP NOT NULL, "last_login_ip" character varying NOT NULL, "visibility" boolean NOT NULL DEFAULT true, "admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
