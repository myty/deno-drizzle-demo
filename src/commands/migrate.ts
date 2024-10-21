import { migrate } from "drizzle-orm/postgres-js/migrator";
import { command } from "@drizzle-team/brocli";
import { client, db } from "../db/db.ts";

export default command({
  name: "migrate",
  desc: "Run data migrations",
  handler: async () => {
    await migrate(db, { migrationsFolder: "drizzle" });
    await client.end();
  },
});
