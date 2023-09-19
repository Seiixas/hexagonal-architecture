import { HasherProvider } from "app/providers/hasher/hasher.provider";

export class HasherProviderInMemory implements HasherProvider {
  private readonly alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  async hash(value: string): Promise<string> {
    return value
      .split("")
      .map((el) => {
        let indexOfEl = this.alphabet.indexOf(el.toUpperCase());
        if (indexOfEl === -1) {
          return el;
        }
        let newIndex = (indexOfEl + 13) % 26;
        return el === el.toUpperCase()
          ? this.alphabet[newIndex]
          : this.alphabet[newIndex].toLowerCase();
      })
      .join("");
  }

  async compare(value: string, _value: string): Promise<boolean> {
    const decrypt = value
      .split("")
      .map((el) => {
        let indexOfEl = this.alphabet.indexOf(el.toUpperCase());
        if (indexOfEl === -1) {
          return el;
        }
        let newIndex = (indexOfEl - 13 + 26) % 26;
        return el === el.toUpperCase()
          ? this.alphabet[newIndex]
          : this.alphabet[newIndex].toLowerCase();
      })
      .join("");

    return decrypt === _value;
  }
}
