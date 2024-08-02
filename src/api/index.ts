import { Hono } from "@hono/hono";
import { timing } from "@hono/hono/timing";
import { usersRoute } from "./users.ts";
import { petsRoute } from "./pets.ts";

export const app = new Hono();
app.use("*", timing());
app.route("/users", usersRoute);
app.route("/pets", petsRoute);
