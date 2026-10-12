export const CURRENCIES = [
  { code: "THB", label: "THB (฿) Thai Baht" },
  { code: "USD", label: "USD ($) US Dollar" },
  { code: "EUR", label: "EUR (€) Euro" },
  { code: "GBP", label: "GBP (£) British Pound" },
  { code: "JPY", label: "JPY (¥) Japanese Yen" },
  { code: "SGD", label: "SGD (S$) Singapore Dollar" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "THB";

export function isCurrencyCode(value: string): value is CurrencyCode {
  return CURRENCIES.some((c) => c.code === value);
}
