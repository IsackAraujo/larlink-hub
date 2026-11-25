import type { FunnelStage } from "@/lib/painel/types";

export function FunnelBars({ stages }: { stages: FunnelStage[] }) {
  const max = Math.max(1, ...stages.map((s) => s.count));
  return (
    <ul className="space-y-2.5">
      {stages.map((stage) => (
        <li key={stage.label}>
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[.06em]">
            <span>{stage.label}</span>
            <b>{stage.count}</b>
          </div>
          <div className="mt-1 h-3 border border-ink" aria-hidden="true">
            <div
              className="h-full bg-[repeating-linear-gradient(45deg,var(--ink-print)_0_2px,var(--paper)_2px_5px)]"
              style={{ width: `${Math.round((stage.count / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
