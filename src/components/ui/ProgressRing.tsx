import { cn } from "@/lib/cn";

export function ProgressRing({
  value,
  max,
  label,
  hint,
  size = 96,
  className,
}: {
  value: number;
  max: number;
  label: string;
  hint?: string;
  size?: number;
  className?: string;
}) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const done = pct >= 1;

  return (
    <div className={cn("relative z-[2] flex items-center gap-4", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          role="img"
          aria-label={`${label}: ${value} de ${max}`}
        >
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--sun)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            style={{ transition: "stroke-dashoffset var(--t-slow) var(--ease-spring)" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-medium tabular-nums text-text">
          {value}
          <span className="text-text-3">/{max}</span>
        </div>
      </div>
      <div>
        <p className="text-[15px] font-semibold text-text">{done ? "Meta do dia ✓" : label}</p>
        {hint && <p className="mt-0.5 text-sm text-text-2">{hint}</p>}
      </div>
    </div>
  );
}
