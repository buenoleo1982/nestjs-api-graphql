import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1734431504377 implements MigrationInterface {
    name = 'CreateUserTable1734431504377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "username" nvarchar(100) NOT NULL, "email" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "passhash" nvarchar(255) NOT NULL, "role" varchar(20) CONSTRAINT CHK_cc2ba77c515d8e8f4289be8512_ENUM CHECK(role IN ('admin','user','manager','guest')) NOT NULL CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'user', "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "deleted_at" datetime NOT NULL, "status" bit NOT NULL CONSTRAINT "DF_3676155292d72c67cd4e090514f" DEFAULT 1, "last_login" datetime NOT NULL, "last_login_ip" nvarchar(255) NOT NULL, "visibility" bit NOT NULL CONSTRAINT "DF_807445b9c7d6276c02eb695bb31" DEFAULT 1, "admin" bit NOT NULL CONSTRAINT "DF_60edf0da4b4d78c67b0ffa5923d" DEFAULT 0, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
