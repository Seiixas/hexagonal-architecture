import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1694818895161 implements MigrationInterface {
    name = 'CreateEntities1694818895161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "email" varchar NOT NULL,
                "password" varchar NOT NULL,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "companies" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "website" varchar NOT NULL,
                "cnpj" varchar NOT NULL,
                "UserId" varchar,
                CONSTRAINT "UQ_703760d095b8e399e34950f4960" UNIQUE ("cnpj")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "places" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "cep" varchar NOT NULL,
                "street" varchar NOT NULL,
                "number" varchar NOT NULL,
                "district" varchar NOT NULL,
                "city" varchar NOT NULL,
                "state" varchar NOT NULL,
                "CompanyId" varchar
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_companies" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "website" varchar NOT NULL,
                "cnpj" varchar NOT NULL,
                "UserId" varchar,
                CONSTRAINT "UQ_703760d095b8e399e34950f4960" UNIQUE ("cnpj"),
                CONSTRAINT "FK_e86ecd593916daacf397111390e" FOREIGN KEY ("UserId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_companies"(
                    "id",
                    "created_at",
                    "updated_at",
                    "name",
                    "website",
                    "cnpj",
                    "UserId"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "website",
                "cnpj",
                "UserId"
            FROM "companies"
        `);
        await queryRunner.query(`
            DROP TABLE "companies"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_companies"
                RENAME TO "companies"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_places" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "cep" varchar NOT NULL,
                "street" varchar NOT NULL,
                "number" varchar NOT NULL,
                "district" varchar NOT NULL,
                "city" varchar NOT NULL,
                "state" varchar NOT NULL,
                "CompanyId" varchar,
                CONSTRAINT "FK_cf4c646f087a0d2c6dd52254009" FOREIGN KEY ("CompanyId") REFERENCES "companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_places"(
                    "id",
                    "created_at",
                    "updated_at",
                    "name",
                    "cep",
                    "street",
                    "number",
                    "district",
                    "city",
                    "state",
                    "CompanyId"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "cep",
                "street",
                "number",
                "district",
                "city",
                "state",
                "CompanyId"
            FROM "places"
        `);
        await queryRunner.query(`
            DROP TABLE "places"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_places"
                RENAME TO "places"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "places"
                RENAME TO "temporary_places"
        `);
        await queryRunner.query(`
            CREATE TABLE "places" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "cep" varchar NOT NULL,
                "street" varchar NOT NULL,
                "number" varchar NOT NULL,
                "district" varchar NOT NULL,
                "city" varchar NOT NULL,
                "state" varchar NOT NULL,
                "CompanyId" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "places"(
                    "id",
                    "created_at",
                    "updated_at",
                    "name",
                    "cep",
                    "street",
                    "number",
                    "district",
                    "city",
                    "state",
                    "CompanyId"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "cep",
                "street",
                "number",
                "district",
                "city",
                "state",
                "CompanyId"
            FROM "temporary_places"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_places"
        `);
        await queryRunner.query(`
            ALTER TABLE "companies"
                RENAME TO "temporary_companies"
        `);
        await queryRunner.query(`
            CREATE TABLE "companies" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "website" varchar NOT NULL,
                "cnpj" varchar NOT NULL,
                "UserId" varchar,
                CONSTRAINT "UQ_703760d095b8e399e34950f4960" UNIQUE ("cnpj")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "companies"(
                    "id",
                    "created_at",
                    "updated_at",
                    "name",
                    "website",
                    "cnpj",
                    "UserId"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "website",
                "cnpj",
                "UserId"
            FROM "temporary_companies"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_companies"
        `);
        await queryRunner.query(`
            DROP TABLE "places"
        `);
        await queryRunner.query(`
            DROP TABLE "companies"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
