import type { ReactNode } from "react";

import { Logo } from "@/components/ui/Logo";

/** Centered card layout shared by the sign-up and sign-in pages. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="bg-brand-gradient pointer-events-none absolute -top-40 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo preload />
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-float ring-1 ring-brand-100 sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
