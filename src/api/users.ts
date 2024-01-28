import { endTime, Hono, startTime } from "../../deps.ts";
import { User } from "../db/models/users.ts";
import type { Create } from "../core/interfaces/repository.ts";
import { userRepository } from "../db/repositories/users.ts";

export const usersRoute = new Hono();

// -------------------------
// INDEX
// -------------------------
usersRoute.get("/", async (c) => {
  startTime(c, "data");

  const users = await userRepository.findAll();

  endTime(c, "data");

  return c.json(users);
});

// -------------------------
// GET
// -------------------------
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

// -------------------------
// POST
// -------------------------
usersRoute.post("/", async (c) => {
  const owner = await c.req.json<Create<User>>();

  startTime(c, "data");

  const createdOwner = await userRepository.create(owner);

  endTime(c, "data");

  return c.json(createdOwner);
});
