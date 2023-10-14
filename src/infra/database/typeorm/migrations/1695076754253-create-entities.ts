import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1695076754253 implements MigrationInterface {
  name = "CreateEntities1695076754253";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table if not exists "users" (
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
            create table if not exists "companies" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "website" varchar NOT NULL,
                "cnpj" varchar NOT NULL,
                "userId" varchar,
                CONSTRAINT "UQ_703760d095b8e399e34950f4960" UNIQUE ("cnpj")
            )
        `);
    await queryRunner.query(`
            create table if not exists "places" (
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
                "companyId" varchar
            )
        `);
    await queryRunner.query(`
            create table if not exists "temporary_companies" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "website" varchar NOT NULL,
                "cnpj" varchar NOT NULL,
                "userId" varchar,
                CONSTRAINT "UQ_703760d095b8e399e34950f4960" UNIQUE ("cnpj"),
                CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
                    "userId"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "website",
                "cnpj",
                "userId"
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
            create table if not exists "temporary_places" (
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
                "companyId" varchar,
                CONSTRAINT "FK_fd173428a711ad0f0f879ef976c" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
                    "companyId"
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
                "companyId"
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
            create table if not exists "places" (
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
                "companyId" varchar
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
                    "companyId"
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
                "companyId"
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
            create table if not exists "companies" (
                "id" varchar PRIMARY KEY NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar NOT NULL,
                "website" varchar NOT NULL,
                "cnpj" varchar NOT NULL,
                "userId" varchar,
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
                    "userId"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "website",
                "cnpj",
                "userId"
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
