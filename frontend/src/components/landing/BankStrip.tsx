const banks = ["KBank", "SCB", "Bangkok Bank", "Krungthai", "Krungsri", "ttb", "PromptPay"];

export function BankStrip() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10">
        <p className="shrink-0 text-sm font-medium text-muted">Reads slips from major Thai banks</p>
        <ul className="flex flex-wrap justify-center gap-3 lg:justify-start">
          {banks.map((bank) => (
            <li
              key={bank}
              className="rounded-xl bg-canvas px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-line"
            >
              {bank}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
