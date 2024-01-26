import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  emailAddress: varchar("email_address", { length: 256 }).unique(),
  phone: varchar("phone", { length: 256 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  pets: many(pets),
}));

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  favoriteFood: text("favorite_food").notNull(),
  ownerId: integer("owner_id").notNull().references(() => users.id),
});

export const petsRelations = relations(pets, ({ one }) => ({
  author: one(users, {
    fields: [pets.ownerId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type Pet = typeof pets.$inferSelect;
export type UserWithPets = User & { pets: Pet[] };
