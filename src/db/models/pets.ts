import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { users } from "./users.ts";

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  favoriteFood: text("favorite_food").notNull(),
  ownerId: integer("owner_id").notNull().references(() => users.id),
});

export const petsRelations = relations(pets, ({ one }) => ({
  owner: one(users, {
    fields: [pets.ownerId],
    references: [users.id],
  }),
}));

export type Pet = typeof pets.$inferSelect;
