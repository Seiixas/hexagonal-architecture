import { DataSource } from "typeorm";
import path from "path";

const migrationsDir = path.resolve(__dirname, "migrations", "*{.ts,.js}");
const entitiesDir = path.resolve(__dirname, "entities", "*.entity{.ts,.js}");
const databaseDir = path.resolve(__dirname, "local.sql");

export const dataSource = new DataSource({
  type: "sqlite",
  database: databaseDir,
  migrations: [migrationsDir],
  entities: [entitiesDir],
  synchronize: false,
});
