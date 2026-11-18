import { cn } from "@/lib/cn";
import { GlassCard } from "./GlassCard";

export function Stat({
  label,
  value,
  delta,
  suffix,
  sheen,
  className,
}: {
  label: string;
  value: string | number;
  /** Variação em % vs. período anterior. */
  delta?: number;
  suffix?: string;
  sheen?: boolean;
  className?: string;
}) {
  return (
    <GlassCard sheen={sheen} className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs font-medium uppercase tracking-[0.06em] text-text-2">{label}</span>
      <span className="font-mono text-[28px] font-medium tabular-nums tracking-tight text-text">
        {value}
        {suffix && <span className="ml-1 text-base text-text-3">{suffix}</span>}
      </span>
      {delta !== undefined && (
        <span className={cn("font-mono text-xs tabular-nums", delta >= 0 ? "text-ok" : "text-err")}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(0)}% vs. anterior
        </span>
      )}
    </GlassCard>
  );
}
