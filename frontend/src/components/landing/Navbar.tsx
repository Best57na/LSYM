import Link from "next/link";

import { NavAuthButtons } from "@/components/landing/NavAuthButtons";
import { Logo } from "@/components/ui/Logo";

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo preload />

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-brand-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <NavAuthButtons />
      </nav>
    </header>
  );
}
