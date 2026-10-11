import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";

export function CtaBanner() {
  return (
    <section id="get-started" className="scroll-mt-20 px-4 pb-24 sm:px-6">
      <div className="bg-brand-gradient relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl px-8 py-12 shadow-float sm:flex-row sm:items-center sm:px-12">
        {/* Decorative circles */}
        <div aria-hidden className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-white/15" />
        <div aria-hidden className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Ready to get started?</h2>
          <p className="mt-2 text-white/85">Track your first slip in under a minute. It&apos;s free.</p>
        </div>

        <ButtonLink href="/sign-up" size="lg" variant="dark" className="relative shrink-0">
          Create free account
          <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </div>
    </section>
  );
}
