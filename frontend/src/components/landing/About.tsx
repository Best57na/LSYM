import { Quote, ShieldCheck, Smartphone, Zap } from "lucide-react";

const points = [
  {
    icon: Smartphone,
    title: "Made for PromptPay",
    text: "Most Thai payments end with a slip screenshot. SlipWise turns that screenshot into a record.",
  },
  {
    icon: Zap,
    title: "Seconds, not spreadsheets",
    text: "No typing amounts or dates. Check what the AI read, then confirm.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    text: "Slip images are never stored, and neither are account numbers.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {points.map((point) => (
            <div key={point.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-card">
                <point.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-ink">{point.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder testimonial: replace with real user feedback before launch. */}
        <figure className="mx-auto mt-20 max-w-2xl text-center">
          <Quote className="mx-auto h-8 w-8 text-brand-300" aria-hidden />
          <blockquote className="mt-4 text-xl leading-relaxed font-medium text-ink sm:text-2xl">
            “I used to type every transfer into a spreadsheet. Now I upload the slip and it&apos;s
            done.”
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <span className="bg-brand-gradient grid h-11 w-11 place-items-center rounded-full text-sm font-semibold text-white">
              PS
            </span>
            <span className="text-left text-sm">
              <span className="block font-semibold text-ink">Ploy S.</span>
              <span className="text-muted">Freelance designer, Bangkok</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
