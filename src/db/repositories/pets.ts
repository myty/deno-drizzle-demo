import { db } from "../db.ts";
import { Create, Repository } from "../../core/interfaces/repository.ts";
import { Pet, pets } from "../models/pets.ts";
import { eq } from "drizzle-orm";

export class PetRepository implements Repository<Pet> {
  async findAll(): Promise<Pet[]> {
    const results = await db.select().from(pets);

    return results;
  }

  async find(id: number): Promise<Pet | null> {
    const result = await db.query.pets.findFirst({
      where: eq(pets.id, id),
    });

    return result ?? null;
  }

  async create(value: Create<Pet>): Promise<Pet> {
    const [result] = await db.insert(pets).values(value).returning();

    return result;
  }

  async delete(id: number): Promise<void> {
    await db.delete(pets).where(eq(pets.id, id));
  }
}

export const petRepository = new PetRepository();
