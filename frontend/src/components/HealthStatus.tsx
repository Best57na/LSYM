"use client";

import { useEffect, useState } from "react";

import { API_URL, getHealth } from "@/lib/api";
import type { HealthResponse } from "@/types/api";

type State =
  | { kind: "loading" }
  | { kind: "ok"; data: HealthResponse }
  | { kind: "error"; message: string };

export function HealthStatus() {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    getHealth(controller.signal)
      .then((data) => setState({ kind: "ok", data }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setState({ kind: "error", message: err instanceof Error ? err.message : String(err) });
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="w-full rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
      <h2 className="text-sm font-medium text-zinc-500">Backend status</h2>
      <p className="mt-1 font-mono text-xs text-zinc-400">{API_URL}/health</p>

      {state.kind === "loading" && <p className="mt-3">Checking…</p>}

      {state.kind === "error" && (
        <p className="mt-3 text-red-600 dark:text-red-400">
          API unreachable: {state.message}. Is the backend running on port 8000?
        </p>
      )}

      {state.kind === "ok" && (
        <ul className="mt-3 space-y-1">
          <StatusRow label="API" ok={state.data.status === "ok"} />
          <StatusRow label="MongoDB" ok={state.data.database === "ok"} />
        </ul>
      )}
    </section>
  );
}

function StatusRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${ok ? "bg-emerald-500" : "bg-amber-500"}`} />
      <span>{label}</span>
      <span className="text-zinc-500">{ok ? "ok" : "unreachable"}</span>
    </li>
  );
}
