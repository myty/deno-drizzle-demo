import type { Column } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { pet, user } from "../db/schema.ts";
import { client, db } from "../db/db.ts";

function count(col: Column) {
  return sql<number>`count(${col})`;
}

export async function seedDatabase() {
  const [{ userCount }] = await db.select({ userCount: count(user.id) })
    .from(user);

  if (userCount < 1) {
    console.log("There are no users in the database. Creating one now...");
    const [owner] = await db.insert(user).values({
      fullName: "Pet Owner",
      emailAddress: "owner@pets.com",
    }).returning();

    await db.insert(pet).values([
      { name: "Fido", ownerId: owner.id },
      { name: "Mittens", ownerId: owner.id },
    ]).returning();
  }

  await client.end();
}
