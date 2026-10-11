import { Bus, CircleCheck, ScanLine, Send, Utensils } from "lucide-react";

// Static sample data for the marketing preview. Not real user data.
const transactions = [
  {
    icon: Utensils,
    name: "ร้านส้มตำนัว",
    category: "Food",
    chip: "bg-rose/10 text-rose",
    amount: "−฿120.00",
  },
  {
    icon: Bus,
    name: "BTS Skytrain",
    category: "Transport",
    chip: "bg-brand-100 text-brand-700",
    amount: "−฿47.00",
  },
  {
    icon: Send,
    name: "PromptPay transfer",
    category: "Transfer",
    chip: "bg-income/10 text-income",
    amount: "−฿2,000.00",
  },
];

export function HeroPreview() {
  return (
    <div
      className="relative mx-auto mb-12 w-full max-w-md lg:max-w-none"
      role="img"
      aria-label="Preview of the LSYM dashboard"
    >
      <div
        aria-hidden
        className="rounded-3xl bg-white p-5 pb-28 shadow-float ring-1 ring-brand-100 sm:p-6 sm:pb-28"
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-brand-600">Dashboard</p>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
            Oct 2026
          </span>
        </div>

        <div className="bg-brand-gradient mt-4 rounded-2xl p-5 text-white">
          <p className="text-xs font-medium text-white/80">Spent this month</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight">฿12,450.00</p>
          <div className="mt-6 flex items-end justify-between text-xs text-white/85">
            <span>18 slips scanned</span>
            <span className="font-semibold">−8% vs Sep</span>
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-muted">Last transactions</p>
        <ul className="mt-2 divide-y divide-line">
          {transactions.map((tx) => (
            <li key={tx.name} className="flex items-center gap-3 py-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-canvas text-brand-500">
                <tx.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{tx.name}</span>
              <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${tx.chip}`}>
                {tx.category}
              </span>
              <span className="w-24 text-right text-sm font-semibold">{tx.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating "slip read" card */}
      <div
        aria-hidden
        className="absolute -bottom-12 left-4 w-60 rounded-2xl bg-white p-4 shadow-float ring-1 ring-brand-100 sm:-left-10"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <ScanLine className="h-4 w-4 text-brand-500" />
          Slip read in 2.1s
        </div>
        <dl className="mt-3 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <dt className="text-muted">Amount</dt>
            <dd className="font-semibold">฿350.00</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Bank</dt>
            <dd className="font-medium">KBank</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">To</dt>
            <dd className="font-medium">Sea Sound Café</dd>
          </div>
        </dl>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-income">
          <CircleCheck className="h-3.5 w-3.5" />
          Ready to confirm
        </div>
      </div>
    </div>
  );
}
