import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

import { HeroPreview } from "@/components/landing/HeroPreview";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft background glow */}
      <div
        aria-hidden
        className="bg-brand-gradient pointer-events-none absolute -top-40 right-0 h-120 w-120 rounded-full opacity-25 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-2 lg:pt-24">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-200">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            New: reads Thai bank slips with AI
          </span>

          <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
            The simplest way to <span className="text-brand-600">track every baht</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg text-muted">
            Snap a transfer slip or receipt. LSYM reads the amount, date, bank and recipient,
            suggests a category, and you confirm in one tap.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/sign-up" size="lg">
              Get started free
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#features" size="lg" variant="secondary">
              <PlayCircle className="h-4 w-4" aria-hidden />
              Watch demo
            </ButtonLink>
          </div>

          <p className="mt-5 text-xs text-muted">No credit card required · Free plan forever</p>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}
