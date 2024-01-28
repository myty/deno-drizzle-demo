import { users } from "../models/users.ts";
import { UserRepository } from "./users.ts";
import { Table, TableConfig } from "drizzle-orm";

interface RepositoryMap {
  [users._.name]: UserRepository;
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
