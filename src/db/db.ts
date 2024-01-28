import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema.ts";

export const connectionString = Deno.env.get("DATABASE_URL") || "";
export const client = postgres(connectionString);
export const db = drizzle(client, { schema });
