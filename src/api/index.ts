import { Hono, timing } from "../../deps.ts";
import { usersRoute } from "./users.ts";
import { petsRoute } from "./pets.ts";

export const app = new Hono();
app.use("*", timing());
app.route("/users", usersRoute);
app.route("/pets", petsRoute);
