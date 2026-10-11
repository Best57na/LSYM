import type { Metadata } from "next";

import { HealthStatus } from "@/components/HealthStatus";

export const metadata: Metadata = {
  title: "Status | SlipWise",
};

export default function StatusPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold text-brand-600">System status</h1>
      <HealthStatus />
    </main>
  );
}
