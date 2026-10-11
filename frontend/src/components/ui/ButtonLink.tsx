import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "dark";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-card hover:bg-brand-700",
  secondary: "bg-white text-ink ring-1 ring-line hover:ring-brand-300 hover:text-brand-700",
  dark: "bg-ink text-white hover:bg-brand-900",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
