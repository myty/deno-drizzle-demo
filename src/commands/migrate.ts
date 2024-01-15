import { migrate } from "drizzle-orm/postgres-js/migrator";
import { client, db } from "../db/db.ts";

export async function migrateDatabase() {
  await migrate(db, { migrationsFolder: "drizzle" });
  await client.end();
}
