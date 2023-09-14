export interface BaseRepository<T> {
  store(data: T): Promise<T>;
  find({ where }: { where: Partial<T> }): Promise<T | null>;
  remove(item: T): Promise<void>;
  all(): Promise<T[]>;
}
