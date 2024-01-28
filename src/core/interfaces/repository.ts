export type Entity = { id: unknown };
export type Create<TEntity extends Entity> = Omit<TEntity, "id">;
export type Id<TEntity extends Entity> = TEntity["id"];

export interface Repostitory<TEntity extends Entity> {
  findAll(): Promise<TEntity[]>;
  find(id: Id<TEntity>): Promise<TEntity | null>;
  create(value: Create<TEntity>): Promise<TEntity>;
}
