import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "src/db/models/*.ts",
  out: "./drizzle",
  dbCredentials: {
    url: Deno.env.get("DATABASE_URL") ?? "",
  },
});
