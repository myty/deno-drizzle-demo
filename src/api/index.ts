import { Hono, timing } from "../../deps.ts";
import { usersRoute } from "./users.ts";

export const app = new Hono();
app.use("*", timing());
app.route("/users", usersRoute);
