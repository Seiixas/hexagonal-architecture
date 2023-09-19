export abstract class HasherProvider {
  abstract hash(value: string): Promise<string>;
}
