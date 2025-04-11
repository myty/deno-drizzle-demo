import { Hono } from "hono";
import { endTime, startTime } from "hono/timing";
import { User, users } from "../db/models/users.ts";
import type { Create } from "../core/interfaces/repository.ts";
import { Repository } from "../db/repositories/index.ts";
const userRepository = Repository(users);

export const usersRoute = new Hono();

// --------------------------------------------------
// LIST
// --------------------------------------------------
usersRoute.get("/", async (c) => {
  startTime(c, "data");

  const users = await userRepository.findAll();

  endTime(c, "data");

  return c.json(users);
});

// --------------------------------------------------
// GET
// --------------------------------------------------
usersRoute.get("/:id", async (c) => {
  const userId = parseInt(c.req.param("id"), 10);

  startTime(c, "data");

  const foundUser = await userRepository.find(userId);

  endTime(c, "data");

  if (!foundUser) {
    return c.text("User not found.", 404);
  }

  return c.json(foundUser);
});

// --------------------------------------------------
// CREATE
// --------------------------------------------------
usersRoute.post("/", async (c) => {
  const owner = await c.req.json<Create<User>>();

  startTime(c, "data");

  const createdOwner = await userRepository.create(owner);

  endTime(c, "data");

  return c.json(createdOwner, 201);
});

// --------------------------------------------------
// DELETE
// --------------------------------------------------
usersRoute.delete("/:id", async (c) => {
  const userId = parseInt(c.req.param("id"), 10);

  startTime(c, "data");

  await userRepository.delete(userId);

  endTime(c, "data");

  return c.text("User deleted.", 200);
});
