import { Hono } from "hono";
import { endTime, startTime } from "hono/timing";
import { Pet, pets } from "../db/models/pets.ts";
import type { Create } from "../core/interfaces/repository.ts";
import { Repository } from "../db/repositories/index.ts";
const petRepository = Repository(pets);

export const petsRoute = new Hono();

// --------------------------------------------------
// LIST
// --------------------------------------------------
petsRoute.get("/", async (c) => {
  startTime(c, "data");

  const pets = await petRepository.findAll();

  endTime(c, "data");

  return c.json(pets);
});

// --------------------------------------------------
// GET
// --------------------------------------------------
petsRoute.get("/:id", async (c) => {
  const petId = parseInt(c.req.param("id"), 10);

  startTime(c, "data");

  const foundPet = await petRepository.find(petId);

  endTime(c, "data");

  if (!foundPet) {
    return c.text("Pet not found.", 404);
  }

  return c.json(foundPet);
});

// --------------------------------------------------
// CREATE
// --------------------------------------------------
petsRoute.post("/", async (c) => {
  const pet = await c.req.json<Create<Pet>>();

  startTime(c, "data");

  const createdPet = await petRepository.create(pet);

  endTime(c, "data");

  return c.json(createdPet, 201);
});

// --------------------------------------------------
// DELETE
// --------------------------------------------------
// eslint-disable-next-line drizzle/enforce-delete-with-where
petsRoute.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);

  startTime(c, "data");

  await petRepository.delete(id);

  endTime(c, "data");

  return c.text("Pet deleted.", 200);
});
