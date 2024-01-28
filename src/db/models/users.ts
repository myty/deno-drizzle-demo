import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { pets } from "./pets.ts";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  emailAddress: varchar("email_address", { length: 256 }).unique(),
  phone: varchar("phone", { length: 256 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  pets: many(pets),
}));

export type User = typeof users.$inferSelect;
