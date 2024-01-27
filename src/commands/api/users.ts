import { sql } from "drizzle-orm";
import { db } from "../../db/db.ts";
import { endTime, Hono, startTime } from "../../../deps.ts";

export const usersRoute = new Hono();

// -------------------------
// PREPARED QUERIES
// -------------------------

const getAllUsers = db.query.users.findMany({
  with: {
    pets: {
      columns: {
        id: true,
        name: true,
        favoriteFood: true,
      },
    },
  },
}).prepare("getAllUsers");

const getUserById = db.query.users.findFirst({
  with: {
    pets: {
      columns: {
        id: true,
        name: true,
        favoriteFood: true,
      },
    },
  },
  where: ((users, { eq }) => eq(users.id, sql.placeholder("userId"))),
}).prepare("getUserById");

// -------------------------
// INDEX
// -------------------------
usersRoute.get("/", async (c) => {
  startTime(c, "data");
  const usersWithPets = await getAllUsers.execute();
  endTime(c, "data");

  return c.json(usersWithPets);
});

// -------------------------
// GET
// -------------------------
usersRoute.get("/:id", async (c) => {
  const userId = parseInt(c.req.param("id"), 10);
  startTime(c, "data");
  const foundUser = await getUserById.execute({ userId });
  endTime(c, "data");

  if (!foundUser) {
    return c.text("User not found.", 404);
  }

  return c.json(foundUser);
});
