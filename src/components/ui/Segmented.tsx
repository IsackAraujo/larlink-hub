"use client";

import { cn } from "@/lib/cn";

export type SegmentedOption<T extends string> = { value: T; label: string; count?: number };

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={cn("glass flex gap-1 rounded-pill p-1", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "flex h-9 flex-1 items-center justify-center gap-1.5 rounded-pill px-3 text-sm font-medium",
              "transition-[background-color,color,box-shadow] duration-240 ease-out",
              active ? "bg-ceramic text-ink shadow-1" : "text-text-2 hover:text-text",
            )}
          >
            {o.label}
            {o.count !== undefined && (
              <span className={cn("font-mono text-xs tabular-nums", active ? "text-sun" : "text-text-3")}>
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
