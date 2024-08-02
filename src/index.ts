import Denomander from "denomander";
import { seedDatabase } from "./commands/seed.ts";
import { migrateDatabase } from "./commands/migrate.ts";
import { runWebApi } from "./commands/api.ts";

const program = new Denomander({
  app_name: "DenoDrizzleDemo",
  app_description: "Deno Drizzle Demo",
  app_version: "0.1.0",
});

program
  .command("api", "Run web api").action(runWebApi)
  .command("seed", "Seed database").action(seedDatabase)
  .command("migrate", "run migrations").action(migrateDatabase)
  .parse(Deno.args);
