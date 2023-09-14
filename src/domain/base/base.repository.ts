export interface BaseRepository<T, DTO> {
  store(data: DTO): Promise<T>;
  find({ where }: { where: Partial<T> }): Promise<T | null>;
  remove(item: T): Promise<void>;
  all(): Promise<T[]>;
}
