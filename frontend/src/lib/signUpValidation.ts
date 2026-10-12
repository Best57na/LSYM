import { isCurrencyCode } from "@/lib/currencies";

// Must match the password minimum configured on the Clerk instance.
export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignUpValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  currency: string;
  termsAccepted: boolean;
};

export type SignUpFieldErrors = Partial<Record<keyof SignUpValues, string>>;

/** Client-side checks run before calling Clerk. Clerk re-validates on the server. */
export function validateSignUp(values: SignUpValues): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};

  if (!values.fullName) errors.fullName = "Enter your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match.";
  }
  if (!isCurrencyCode(values.currency)) errors.currency = "Choose a currency.";
  if (!values.termsAccepted) errors.termsAccepted = "You need to accept the terms to continue.";

  return errors;
}

/** "Jane Doe" -> { firstName: "Jane", lastName: "Doe" }; the last word becomes the last name. */
export function splitFullName(fullName: string): { firstName: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts.at(-1) };
}
