import { cn } from "@/lib/cn";

/** Selo para telas e recursos em beta (ainda sem dados reais ou sem automação ligada). */
export function BetaBadge({ className, label = "Beta" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-pill border border-sun/40 bg-sun-soft px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-deep",
        className,
      )}
    >
      {label}
    </span>
  );
}
