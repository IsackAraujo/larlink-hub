import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Section({
  title,
  count,
  action,
  children,
  className,
}: {
  title: string;
  count?: number;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("enter flex flex-col gap-3", className)}>
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-[15px] font-semibold text-text">
          {title}
          {count !== undefined && (
            <span className="ml-2 font-mono text-sm tabular-nums text-text-3">{count}</span>
          )}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
