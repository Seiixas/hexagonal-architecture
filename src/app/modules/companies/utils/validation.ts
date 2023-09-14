export class Validation {
  public static isCNPJ(CNPJ: string): string | null {
    const MAX_CNPJ_LENGTH_WITH_SYMBOLS = 18;
    const MAX_CNPJ_LENGTH_WITHOUT_SYMBOLS = 14;

    if (CNPJ.length !== MAX_CNPJ_LENGTH_WITH_SYMBOLS) return null;

    const cnpjOnlyNumbers = CNPJ.replace(/[^0-9]/g, "");

    if (cnpjOnlyNumbers.length !== MAX_CNPJ_LENGTH_WITHOUT_SYMBOLS) return null;

    const isCNPJOnlyNumbers = /^-?[\d.]+(?:e-?\d+)?$/.test(cnpjOnlyNumbers);

    if (!isCNPJOnlyNumbers) return null;

    return cnpjOnlyNumbers;
  }

  public static isWebsite(website: string): boolean {
    var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    return urlPattern.test(website);
  }
}
