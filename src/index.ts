import Denomander from "https://deno.land/x/denomander@0.9.3/mod.ts";
import { seedDatabase } from "./commands/seed.ts";
import { migrateDatabase } from "./commands/migrate.ts";
import { runWebApplication } from "./commands/web.ts";

const program = new Denomander({
  app_name: "DenoDrizzleDemo",
  app_description: "Deno Drizzle Demo",
  app_version: "0.1.0",
});

program
  .command("run", "Run application").action(runWebApplication)
  .command("seed", "Seed database").action(seedDatabase)
  .command("migrate", "run migrations").action(migrateDatabase)
  .parse(Deno.args);
