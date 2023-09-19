export abstract class BaseRepository<T> {
  abstract store(data: T): Promise<T>;
  abstract find({ where }: { where: Partial<T> }): Promise<T | null>;
  abstract remove(item: T): Promise<void>;
  abstract all(): Promise<T[]>;
  abstract update(old: T, _new: Partial<T>): Promise<void>;
}
