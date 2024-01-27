import { sql } from "drizzle-orm";
import { db } from "../db/db.ts";
import { endTime, Hono, startTime, timing } from "../../deps.ts";

const getAllUsers = db.query.users.findMany({
  with: { pets: true },
}).prepare("getAllUsers");

const getUserById = db.query.users.findFirst({
  with: { pets: true },
  where: ((users, { eq }) => eq(users.id, sql.placeholder("userId"))),
}).prepare("getUserById");

export function runWebApi() {
  const app = new Hono();
  app.use("*", timing());

  app.get("/users", async (c) => {
    startTime(c, "data");
    const usersWithPets = await getAllUsers.execute();
    endTime(c, "data");

    return c.json(usersWithPets);
  });

  app.get("/users/:id", async (c) => {
    const userId = parseInt(c.req.param("id"), 10);
    startTime(c, "data");
    const foundUser = await getUserById.execute({ userId });
    endTime(c, "data");

    if (!foundUser) {
      return c.text("User not found.", 404);
    }

    return c.json(foundUser);
  });

  Deno.serve({ port: 8787 }, app.fetch);
}
