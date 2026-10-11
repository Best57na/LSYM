import { ChartColumn, ScanLine, Tags } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  visual: ReactNode;
};

const features: Feature[] = [
  {
    icon: ScanLine,
    title: "Snap and extract",
    description:
      "Upload a transfer slip or receipt. AI reads the amount, date, bank and recipient in seconds.",
    visual: <SlipVisual />,
  },
  {
    icon: Tags,
    title: "Smart categories",
    description:
      "Every expense gets a suggested category. If it is wrong, change it in one tap.",
    visual: <CategoryVisual />,
  },
  {
    icon: ChartColumn,
    title: "Clear monthly insights",
    description: "See where your money goes each month, by category, without a spreadsheet.",
    visual: <ChartVisual />,
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Everything you need"
          subtitle="Simple tools that show you where every baht goes, without manual typing."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl bg-white p-5 shadow-card">
              <div
                aria-hidden
                className="grid h-40 place-items-center overflow-hidden rounded-xl bg-brand-50"
              >
                {feature.visual}
              </div>
              <div className="mt-5 flex items-center gap-2">
                <feature.icon className="h-5 w-5 text-brand-500" aria-hidden />
                <h3 className="font-semibold text-ink">{feature.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SlipVisual() {
  return (
    <div className="relative w-32 -rotate-6 rounded-lg bg-white p-3 shadow-card">
      <div className="h-2 w-10 rounded bg-income/60" />
      <div className="mt-3 h-1.5 w-full rounded bg-line" />
      <div className="mt-1.5 h-1.5 w-3/4 rounded bg-line" />
      <div className="mt-3 h-3 w-16 rounded bg-brand-300" />
      <div className="mt-3 h-1.5 w-full rounded bg-line" />
      <div className="mt-1.5 h-1.5 w-2/3 rounded bg-line" />
      {/* Scan line */}
      <div className="bg-brand-gradient absolute inset-x-0 top-1/2 h-0.5 shadow-[0_0_12px_2px_rgb(134_149_239/0.6)]" />
    </div>
  );
}

function CategoryVisual() {
  const chips = [
    ["Food", "bg-rose/15 text-rose"],
    ["Transport", "bg-brand-100 text-brand-700"],
    ["Bills", "bg-expense/15 text-expense"],
    ["Shopping", "bg-violet/15 text-violet"],
    ["Transfer", "bg-income/15 text-income"],
  ];
  return (
    <div className="flex max-w-56 flex-wrap justify-center gap-2">
      {chips.map(([label, color]) => (
        <span key={label} className={`rounded-lg px-3 py-1 text-xs font-semibold ${color}`}>
          {label}
        </span>
      ))}
    </div>
  );
}

function ChartVisual() {
  const bars = [40, 65, 45, 80, 55, 92, 70];
  return (
    <div className="flex h-24 items-end gap-2">
      {bars.map((height, i) => (
        <div
          key={i}
          className={`w-5 rounded-t-md ${i === 5 ? "bg-brand-gradient" : "bg-brand-200"}`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
