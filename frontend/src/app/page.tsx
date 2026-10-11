import { HealthStatus } from "@/components/HealthStatus";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">SlipWise</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Upload a Thai bank slip or receipt. AI reads the amount, date, bank and recipient, and
          you confirm before it is saved.
        </p>
      </div>
      <HealthStatus />
    </main>
  );
}
