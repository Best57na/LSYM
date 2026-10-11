export type ButtonVariant = "primary" | "secondary" | "dark";
export type ButtonSize = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white shadow-card hover:bg-brand-700",
  secondary: "bg-white text-ink ring-1 ring-line hover:ring-brand-300 hover:text-brand-700",
  dark: "bg-ink text-white hover:bg-brand-900",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
};

/** Shared classes so <ButtonLink> and <Button> look identical. */
export function buttonClass(variant: ButtonVariant, size: ButtonSize, className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;
}
