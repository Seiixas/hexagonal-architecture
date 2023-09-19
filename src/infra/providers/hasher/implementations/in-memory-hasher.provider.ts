import { HasherProvider } from "../hasher.provider";

export class HasherProviderInMemory implements HasherProvider {
  async hash(value: string): Promise<string> {
    const alphabet = [
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

    return value
      .split("")
      .map((el) => {
        let indexOfEl = alphabet.indexOf(el.toUpperCase());
        if (indexOfEl === -1) {
          return el;
        }
        let newIndex = (indexOfEl + 13) % 26;
        return el === el.toUpperCase()
          ? alphabet[newIndex]
          : alphabet[newIndex].toLowerCase();
      })
      .join("");
  }
}
