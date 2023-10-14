export abstract class HasherProvider {
  abstract hash(value: string): Promise<string>;
  abstract compare(value: string, _value: string): Promise<boolean>;
}
