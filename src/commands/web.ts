import { pet, user } from "../db/schema.ts";
import { eq, sql } from "drizzle-orm";
import { Context, Hono } from "https://deno.land/x/hono@v3.12.4/mod.ts";
import {
  endTime,
  startTime,
  timing,
} from "https://deno.land/x/hono@v3.12.4/middleware.ts";
import { db } from "../db/db.ts";

type User = typeof user.$inferSelect;
type Pet = typeof pet.$inferSelect;
type UserWithPets = User & { pets: Pet[] };

const getAllUsers = db.select().from(user)
  .innerJoin(pet, eq(user.id, pet.ownerId)).prepare("all_users");

const getUserById = db.select().from(user)
  .innerJoin(pet, eq(user.id, pet.ownerId))
  .where(eq(user.id, sql.placeholder("userId"))).prepare("user");

export function runWebApplication() {
  const app = new Hono();
  app.use("*", timing());

  app.get("/users", async (c) => {
    const users = await joinUsersAndPets(c, () => getAllUsers.execute());

    return c.json(users);
  });

  app.get("/users/:id", async (c) => {
    const userId = parseInt(c.req.param("id"), 10);

    const [foundUser] = await joinUsersAndPets(
      c,
      () => getUserById.execute({ userId }),
    );

    if (!foundUser) {
      return c.text("User not found", 404);
    }

    return c.json(foundUser);
  });

  Deno.serve({ port: 8787 }, app.fetch);
}

async function joinUsersAndPets(
  c: Context,
  execute: () => Promise<Array<{ users: User; pets: Pet }>>,
): Promise<Array<UserWithPets>> {
  startTime(c, "data");

  const rows = await execute();

  const resultObj = rows.reduce<
    Record<number, User & { pets: Pet[] }>
  >(
    (acc, row) => {
      const user = row.users;
      const pet = row.pets;

      if (!acc[user.id]) {
        acc[user.id] = { ...user, pets: [] };
      }

      if (pet) {
        acc[user.id].pets.push(pet);
      }

      return acc;
    },
    {},
  );

  const result = Object.values(resultObj);

  endTime(c, "data");

  return result;
}
