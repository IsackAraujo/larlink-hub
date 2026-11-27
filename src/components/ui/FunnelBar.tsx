import { cn } from "@/lib/cn";

export type FunnelStep = { label: string; value: number };

/** Barras horizontais com a conversão entre etapas consecutivas. */
export function FunnelBar({ steps, className }: { steps: FunnelStep[]; className?: string }) {
  const max = Math.max(...steps.map((s) => s.value), 1);
  return (
    <ol className={cn("flex flex-col gap-2.5", className)}>
      {steps.map((s, i) => {
        const prev = steps[i - 1];
        const conv = prev && prev.value > 0 ? Math.round((s.value / prev.value) * 100) : null;
        return (
          <li key={s.label} className="grid grid-cols-[minmax(96px,140px)_1fr_auto] items-center gap-3">
            <span className="truncate text-sm text-text-2">{s.label}</span>
            <div className="h-2.5 overflow-hidden rounded-pill bg-line">
              <div
                className="h-full rounded-pill bg-ink transition-[width] duration-[420ms] ease-out"
                style={{ width: `${(s.value / max) * 100}%`, opacity: 1 - i * 0.1 }}
              />
            </div>
            <span className="w-20 text-right font-mono text-sm tabular-nums text-text">
              {s.value}
              {conv !== null && <span className="ml-1.5 text-xs text-text-3">{conv}%</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
