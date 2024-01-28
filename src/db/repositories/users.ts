import { db } from "../db.ts";
import { Create, Repository } from "../../core/interfaces/repository.ts";
import { User, users } from "../models/users.ts";
import { eq } from "drizzle-orm";

export class UserRepository implements Repository<User> {
  async findAll(): Promise<User[]> {
    const results = await db.select().from(users);

    return results;
  }

  async find(id: number): Promise<User | null> {
    const result = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return result ?? null;
  }

  async create(user: Create<User>): Promise<User> {
    const [result] = await db.insert(users).values(user).returning();

    return result;
  }

  async delete(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}

export const userRepository = new UserRepository();
