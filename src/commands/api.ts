import { app } from "../api/index.ts";

export function runWebApi() {
  Deno.serve({ port: 8787 }, app.fetch);
}
