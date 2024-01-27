import { Hono, timing } from "../../deps.ts";
import { usersRoute } from "./api/users.ts";

export function runWebApi() {
  const app = new Hono();
  app.use("*", timing());
  app.route("/users", usersRoute);

  Deno.serve({ port: 8787 }, app.fetch);
}
