import { app } from "../api/index.ts";
import { command } from "@drizzle-team/brocli";

export default command({
  name: "api",
  desc: "Run web api",
  handler: () => {
    Deno.serve({ port: 8787 }, app.fetch);
  },
});
