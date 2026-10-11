import Link from "next/link";

import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "About", href: "#about" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign up", href: "/sign-up" },
      { label: "Log in", href: "/sign-in" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "System status", href: "/status" },
      { label: "Privacy", href: "#about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo variant="full" />
          <p className="mt-3 max-w-xs text-sm text-muted">
            AI expense tracking for Thai bank slips and receipts.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-sm font-semibold text-ink">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          © 2026 LSYM. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
