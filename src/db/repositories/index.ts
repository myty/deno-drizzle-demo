import { pets } from "../models/pets.ts";
import { users } from "../models/users.ts";
import { PetRepository } from "./pets.ts";
import { UserRepository } from "./users.ts";
import { Table, TableConfig } from "drizzle-orm";

interface RepositoryMap extends Record<string, unknown> {
  [users._.name]: UserRepository;
  [pets._.name]: PetRepository;
}

export function Repository<
  T extends TableConfig & { name: keyof RepositoryMap },
>(
  table: Table<T>,
): RepositoryMap[T["name"]] {
  const isTable = tableMatcher(table);

  if (isTable(users)) {
    return new UserRepository();
  }

  if (isTable(pets)) {
    return new PetRepository();
  }

  throw new Error("No repository found for table.");
}

// deno-lint-ignore no-explicit-any
function tableMatcher(table: any) {
  // deno-lint-ignore no-explicit-any
  return (mappedTable: any) =>
    getSymbolValueByName(table, "drizzle:Name") ===
      getSymbolValueByName(mappedTable, "drizzle:Name");
}

function getSymbolValueByName(
  // deno-lint-ignore no-explicit-any
  obj: any,
  name: string,
): unknown | undefined {
  const foundSymbol = Object.getOwnPropertySymbols(obj).find((symbol) =>
    symbol.description === name
  );

  if (!foundSymbol) {
    return undefined;
  }

  return obj[foundSymbol];
}
