import type { Column } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { pets, users } from "../db/schema.ts";
import { client, db } from "../db/db.ts";

function count(col: Column) {
  return sql<number>`count(${col})`;
}

export async function seedDatabase() {
  const [{ userCount }] = await db.select({ userCount: count(users.id) })
    .from(users);

  if (userCount < 1) {
    console.log("There are no users in the database. Creating one now...");
    const [owner] = await db.insert(users).values({
      fullName: "Pet Owner",
      emailAddress: "owner@pets.com",
    }).returning();

    await db.insert(pets).values([
      { name: "Fido", ownerId: owner.id, favoriteFood: "Bacon" },
      { name: "Mittens", ownerId: owner.id, favoriteFood: "Tuna" },
    ]).returning();
  }

  await client.end();
}
