import { Building2, Check, Rocket, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Plan = {
  name: string;
  icon: LucideIcon;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

// Placeholder plans for the portfolio demo; there is no billing yet.
const plans: Plan[] = [
  {
    name: "Free",
    icon: Sprout,
    price: "฿0",
    period: "/ month",
    description: "For trying it out on your own spending.",
    features: ["30 slip scans per month", "Unlimited manual expenses", "Monthly summary"],
    cta: { label: "Start free", href: "/sign-up" },
  },
  {
    name: "Pro",
    icon: Rocket,
    price: "฿79",
    period: "/ month",
    description: "For people who pay everything by PromptPay.",
    features: [
      "Unlimited slip scans",
      "Custom categories",
      "CSV export",
      "Priority AI processing",
    ],
    cta: { label: "Choose Pro", href: "/sign-up?plan=pro" },
    featured: true,
  },
  {
    name: "Business",
    icon: Building2,
    price: "Custom",
    description: "For small shops and teams sharing expenses.",
    features: ["Everything in Pro", "Up to 10 members", "Shared reports", "Dedicated support"],
    cta: { label: "Contact sales", href: "#get-started" },
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Simple pricing"
          subtitle="Start free. Upgrade when you scan more slips."
        />

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-6 ${
                plan.featured
                  ? "bg-canvas shadow-float ring-2 ring-brand-400"
                  : "bg-white ring-1 ring-line"
              }`}
            >
              {plan.featured && (
                <span className="bg-brand-gradient absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}

              <div
                className={`grid h-12 w-12 place-items-center rounded-xl ${
                  plan.featured ? "bg-brand-gradient text-white" : "bg-brand-50 text-brand-600"
                }`}
              >
                <plan.icon className="h-5 w-5" aria-hidden />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>

              <p className="mt-5">
                <span className="text-4xl font-semibold tracking-tight text-ink">{plan.price}</span>
                {plan.period && <span className="ml-1 text-sm text-muted">{plan.period}</span>}
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-income" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* mt-auto pins the button to the card bottom so all three line up */}
              <div className="mt-auto pt-8">
                <ButtonLink
                  href={plan.cta.href}
                  variant={plan.featured ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta.label}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
