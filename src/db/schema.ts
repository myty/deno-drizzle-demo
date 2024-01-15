import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  emailAddress: varchar("email_address", { length: 256 }).unique(),
  phone: varchar("phone", { length: 256 }),
});

export const pet = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ownerId: integer("owner_id").notNull().references(() => user.id),
});
