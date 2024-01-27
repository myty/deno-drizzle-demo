import { sql } from "drizzle-orm";
import { db } from "../db/db.ts";
import { endTime, Hono, startTime } from "../../deps.ts";
import {
  pets as petsTable,
  users as usersTable,
  UserWithPetsCreate,
} from "../db/schema.ts";

export const usersRoute = new Hono();

// -------------------------
// PREPARED QUERIES
// -------------------------

const getAllUsers = db.query.users.findMany().prepare("getAllUsers");

const getAllUsersWithPets = db.query.users.findMany({
  with: {
    pets: {
      columns: {
        id: true,
        name: true,
        favoriteFood: true,
      },
    },
  },
}).prepare("getAllUsersWithPets");

const getUserById = db.query.users.findFirst({
  where: ((users, { eq }) => eq(users.id, sql.placeholder("userId"))),
}).prepare("getUserById");

const getUserWithPetsById = db.query.users.findFirst({
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
}).prepare("getUserWithPetsById");

// -------------------------
// INDEX
// -------------------------
usersRoute.get("/", async (c) => {
  const includeProperties = c.req.queries("include") ?? [];
  const includePets = includeProperties.includes("pets");

  startTime(c, "data");

  const usersWithPets = await (includePets ? getAllUsersWithPets : getAllUsers)
    .execute();

  endTime(c, "data");

  return c.json(usersWithPets);
});

// -------------------------
// GET
// -------------------------
usersRoute.get("/:id", async (c) => {
  const includeProperties = c.req.queries("include") ?? [];
  const includePets = includeProperties.includes("pets");
  const userId = parseInt(c.req.param("id"), 10);

  startTime(c, "data");

  const foundUser = await (includePets ? getUserWithPetsById : getUserById)
    .execute({ userId });

  endTime(c, "data");

  if (!foundUser) {
    return c.text("User not found.", 404);
  }

  return c.json(foundUser);
});

// -------------------------
// POST
// -------------------------
usersRoute.post("/", async (c) => {
  const { pets, ...owner } = await c.req.json<UserWithPetsCreate>();

  startTime(c, "data");

  const [createdOwner] = await db.insert(usersTable).values(owner).returning();

  const hasPets = Array.isArray(pets) && pets.length > 0;
  if (hasPets) {
    await db.insert(petsTable).values(pets.map((p) => ({
      ...p,
      ownerId: createdOwner.id,
    }))).returning();
  }

  const foundUser = await (hasPets ? getUserWithPetsById : getUserById).execute(
    {
      userId: createdOwner.id,
    },
  );

  endTime(c, "data");

  return c.json(foundUser);
});
