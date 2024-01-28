import * as usersSchema from "./models/users.ts";
import * as petsSchema from "./models/pets.ts";

export const schema = {
  ...usersSchema,
  ...petsSchema,
};
