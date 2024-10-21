import { run } from "@drizzle-team/brocli";
import seedDatabaseComamand from "./commands/seed.ts";
import migrateDatabaseCommand from "./commands/migrate.ts";
import runWebApiCommand from "./commands/api.ts";

await run([runWebApiCommand, seedDatabaseComamand, migrateDatabaseCommand], {
  name: "DenoDrizzleDemo",
  description: "Deno Drizzle Demo",
  version: "0.1.0",
});
