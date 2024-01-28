export type Entity = Record<string, unknown>;
export type Create<TEntity extends Entity> = Omit<TEntity, "id">;
export type Id<TEntity extends Entity> = TEntity extends { id: infer TId } ? TId
  : unknown;

export interface Repository<TEntity extends Entity> {
  findAll(): Promise<TEntity[]>;
  find(id: Id<TEntity>): Promise<TEntity | null>;
  create(value: Create<TEntity>): Promise<TEntity>;
  delete(id: Id<TEntity>): Promise<void>;
}
