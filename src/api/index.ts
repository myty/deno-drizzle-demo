import { Hono } from "hono";
import { timing } from "hono/timing";
import { usersRoute } from "./users.ts";
import { petsRoute } from "./pets.ts";

export const app = new Hono();
app.use("*", timing());
app.route("/users", usersRoute);
app.route("/pets", petsRoute);
